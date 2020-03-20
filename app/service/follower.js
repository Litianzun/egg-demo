const Service = require("egg").Service;

class FollowerService extends Service {
  async findById(uid) {
    const follower = await this.app.mysql.get("follower", { id: uid });
    return { follower };
  }
  async findOne(options) {
    const follower = await this.app.mysql.get("follower", options);
    return follower;
  }
  async findFollowing(offset, limit, userId) {
    try {
      let results = await this.app.mysql.select("follower", {
        offset,
        limit,
        where: { fans: userId }
      });
      let data = [];
      for (let i of results) {
        let userInfo = await this.service.user.find(i.user_id);
        console.log(userInfo);
        if (userInfo) {
          data.push(userInfo);
        }
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async findFans(offset, limit, userId) {
    try {
      let results = await this.app.mysql.select("follower", {
        offset,
        limit,
        where: { user_id: userId }
      });
      let data = [];
      for (let i of results) {
        let userInfo = await this.service.user.find(i.fans);
        console.log(userInfo);
        if (userInfo) {
          data.push(userInfo);
        }
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FollowerService;
