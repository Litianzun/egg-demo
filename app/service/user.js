const Service = require("egg").Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get("users", { id: uid });
    return user;
  }
  async findAll(offset, limit) {
    const results = await this.app.mysql.select("users", {
      offset,
      limit
    });
    return { results };
  }
  async findOne(options) {
    const user = await this.app.mysql.get("users", options);
    return user;
  }
  async create(options) {
    const user = await this.app.mysql.insert("users", { ...options, create_time: this.app.mysql.literals.now });
    return user;
  }
  async update(options) {
    const result = await this.app.mysql.update("users", options);
    return result;
  }
  async delete(uid) {
    const result = await this.app.mysql.delete("users", { id: uid });
    return result;
  }
  async follow(options) {
    const result = await this.app.mysql.insert("follower", options);
    return result;
  }
  async unfollow(uid) {
    console.log(uid,this.ctx.state.user.id)
    const result = await this.app.mysql.delete("follower", { user_id: uid, fans: this.ctx.state.user.id });
    return result;
  }
}

module.exports = UserService;
