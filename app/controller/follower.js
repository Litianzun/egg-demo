const Controller = require("egg").Controller;

class FollowerController extends Controller {
  async listFollowing() {
    const ctx = this.ctx;
    const { offset, limit, userId } = this.ctx.request.body;
    const results = await ctx.service.follower.findFollowing(offset, limit, userId);
    ctx.body = { data: results };
  }
  async listFans() {
    const ctx = this.ctx;
    const { offset, limit, userId } = this.ctx.request.body;
    const results = await ctx.service.follower.findFans(offset, limit, userId);
    ctx.body = { data: results };
  }
}

module.exports = FollowerController;
