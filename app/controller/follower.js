const Controller = require("egg").Controller;

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class FollowerController extends Controller {
  async listFollowing() {
    const ctx = this.ctx;
    const { offset, limit, userId } = this.ctx.request.body;
    // const results = await ctx.service.follower.findFollowing(offset, limit, userId);
    const results = await ctx.model.Follower.findAll({
      limit,
      offset,
      where: { fans: userId }
    });
    const data = await ctx.model.User.findAll({
      where: {
        id: results.map(item => item.userId)
      }
    });
    ctx.body = { status: 200, data };
  }
  async listFans() {
    const ctx = this.ctx;
    const { offset, limit, userId } = this.ctx.request.body;
    const results = await ctx.model.Follower.findAll({
      limit,
      offset,
      where: { userId }
    });
    const data = await ctx.model.User.findAll({
      where: {
        id: results.map(item => item.fans)
      }
    });
    // const results = await ctx.service.follower.findFans(offset, limit, userId);
    ctx.body = { status: 200, data };
  }
}

module.exports = FollowerController;
