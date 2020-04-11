const Controller = require("egg").Controller;
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../secret");
let qiniu = require("qiniu");
const { Op } = require("sequelize");

const accessKey = "s9TMWyqjBgme2Sg_HIYed1-0RmUpyfFdfNhmpN8q";
const secretKey = "nII2-D5qmk3w3YG5tTG32-jjYYujgh1dwq2BRXqU";
const bucket = "egg-demo";

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
    ctx.body = {
      status: 200,
      data: user
    };
  }
  async list() {
    const ctx = this.ctx;
    const { limit, offset, key, userId } = this.ctx.request.body;
    // const results = await ctx.service.user.findAll(offset, limit);
    const results = await ctx.model.User.findAll({
      limit,
      offset,
      where: {
        name: {
          [Op.substring]: key
        }
      },
      //user与note的关系是一对多
      include: {
        model: ctx.model.Note
      }
    });
    const fansRes = await ctx.model.Follower.findAll({
      where: { fans: userId }
    });
    ctx.body = {
      status: 200,
      data: results,
      myFollow: fansRes
    };
  }
  async login() {
    const ctx = this.ctx;
    const { name, password } = this.ctx.request.body;
    ctx.validate({ name: "string", password: "string" });
    const user = await ctx.model.User.findOne({ where: { name, password } });
    if (!user) {
      ctx.throw(404, "用户名或密码不正确!");
      return;
    }
    const { id } = user;
    const token = jsonwebtoken.sign({ id, name }, secret, { expiresIn: "1d" });
    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "登录成功",
      token
    };
    global.userId = id;
    ctx.body.data = user;
  }
  async create() {
    try {
      const ctx = this.ctx;
      const { name } = ctx.request.body;
      const user = await ctx.model.User.findAll({ where: { name: name } });
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
      // const user = await ctx.service.user.find(ctx.request.body.user_id);
      // const user = await ctx.model.User.findByPk(ctx.request.body.userId)
      // if (!user) {
      //   ctx.throw(404, "用户不存在");
      // } else {
      // if (ctx.request.body.fans != ctx.state.user.id) {
      //   ctx.throw(403, "没有权限!");
      // }
      // const follower = await ctx.service.follower.findById(ctx.request.body.user_id);
      const follower = await ctx.model.Follower.findOne({
        where: { userId: ctx.request.body.userId }
      });
      if (follower) {
        ctx.throw(403, "已关注过此人");
      }
      // const result = await ctx.service.user.follow(ctx.request.body);
      const result = await ctx.model.Follower.create(ctx.request.body)
      // if (result.affectedRows === 1) {
        // ctx.status = 204;
        ctx.body = {
          status: 200,
          message: "关注成功",
          data: result
        };
      // }
      // }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }
  async unfollow() {
    try {
      const ctx = this.ctx;
      // const res = await ctx.service.user.unfollow(ctx.params.id);
      const res = await ctx.model.Follower.destroy({
        where: {
          userId: ctx.request.body.userId,
          fans: ctx.request.body.fans
        }
      })
      // if (res.affectedRows > 0) {
        ctx.body = {
          status: 200,
          message: "取关成功",
          data: res
        };
      // }
    } catch (e) {
      console.log(e);
      this.ctx.body = e;
    }
  }

  async qiniutoken() {
    try {
      const ctx = this.ctx;
      let mac = new qiniu.auth.digest.Mac(accessKey, secretKey); //鉴权对象
      let options = {
        scope: bucket,
        expires: 3600 * 24
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      if (uploadToken) {
        ctx.body = JSON.stringify(uploadToken);
      } else {
        ctx.msg = "获取七牛token失败!";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
