const Controller = require("egg").Controller;
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../secret");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async readOne() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const user = await ctx.model.User.findByPk(toInt(userId));
    // const user = await ctx.service.user.find(userId);
    ctx.body = user;
  }
  async list() {
    const ctx = this.ctx;
    const { limit, offset } = this.ctx.request.body;
    // const results = await ctx.service.user.findAll(offset, limit);
    const results = await ctx.model.User.findAll({ limit, offset });
    ctx.body = results;
  }
  async login() {
    const ctx = this.ctx;
    const { name, password } = this.ctx.request.body;
    const user = await ctx.service.user.findOne({ name, password });
    // const user = await ctx.model.User.findAll({ name, password });
    if (!user) {
      ctx.throw(404, "用户名或密码不正确!");
      // ctx.body = {
      //     message: '用户名或密码不正确!'
      // }
      return;
    }
    const { id } = user;
    const token = jsonwebtoken.sign({ id, name }, secret, { expiresIn: "1d" });
    ctx.body = {
      message: "登录成功",
      token
    };
  }
  async create() {
    try {
      const ctx = this.ctx;
      const { name } = ctx.request.body;
      const user = await ctx.model.User.findAll({ where: {name: name} });
      // const user = await ctx.service.user.findOne({ name });
      if (user && user.length > 0) {
        ctx.throw(409, "用户名已被占用");
      }
      const insertRes = await ctx.model.User.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = insertRes;
      // const insertRes = await ctx.service.user.create(ctx.request.body);
      // if (insertRes.affectedRows === 1) {
      //   const newRow = await ctx.service.user.findOne({ name: ctx.request.body.name });
      //   ctx.body = {
      //     message: "新增成功",
      //     data: newRow
      //   };
      // }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
  async update() {
    try {
      const ctx = this.ctx;
      console.log(ctx.state);
      const user = await ctx.model.User.findByPk(toInt(ctx.params.id));
      // const user = await ctx.service.user.find(ctx.params.id);
      if (!user) {
        ctx.throw(404, "用户不存在");
      } else {
        const updateRes = await user.update(ctx.request.body);
        // const updateRes = await ctx.service.user.update(ctx.request.body);
        // if (updateRes.affectedRows === 1) {
        // const newRow = await ctx.service.user.find(toInt(ctx.params.id));
        ctx.body = {
          message: "修改成功",
          data: updateRes
        };
        // } else {
        //   ctx.body = {
        //     message: "修改失败"
        //   };
        // }
      }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
  async delete() {
    try {
      const ctx = this.ctx;
      const user = await ctx.model.User.findByPk(toInt(ctx.params.id));
      if (!user) {
        ctx.throw(404, "用户不存在");
      } else {
        const delRes = await user.destroy();
        // const delRes = await ctx.service.user.delete(ctx.params.id);
        ctx.status = 200;
      }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
  async follow() {
    try {
      const ctx = this.ctx;
      const user = await ctx.service.user.find(ctx.request.body.user_id);
      // if (!user) {
      //   ctx.throw(404, "用户不存在");
      // } else {
      if (ctx.request.body.fans != ctx.state.user.id) {
        ctx.throw(403, "没有权限!");
      }
      const follower = await ctx.service.follower.findById(ctx.request.body.user_id);
      if (follower) {
        ctx.throw(403, "已关注过此人");
      }
      const result = await ctx.service.user.follow(ctx.request.body);
      if (result.affectedRows === 1) {
        // ctx.status = 204;
        ctx.body = {
          message: "关注成功"
        };
      }
      // }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
  async unfollow() {
    try {
      const ctx = this.ctx;
      const res = await ctx.service.user.unfollow(ctx.params.id);
      if (res.affectedRows > 0) {
        ctx.body = {
          message: "取关成功"
        };
      }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
}

module.exports = UserController;