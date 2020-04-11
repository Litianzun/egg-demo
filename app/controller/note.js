const Controller = require("egg").Controller;
const { Op } = require("sequelize");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class NoteController extends Controller {
  async listNotes() {
    const ctx = this.ctx;
    const { offset, limit, key } = this.ctx.request.body;
    const results = await ctx.model.Note.findAll({
      offset,
      limit,
      where: {
        title: {
          [Op.substring]: key
        }
      },
      include: {
        model: ctx.model.User
      }
    });
    //把user信息带到creator里面
    ctx.body = {
      status: 200,
      data: results
    };
  }

  async createNotes() {
    const ctx = this.ctx;
    const insertRes = await ctx.model.Note.create(ctx.request.body);
    ctx.body = {
      status: 200,
      data: insertRes
    };
  }
}

module.exports = NoteController;
