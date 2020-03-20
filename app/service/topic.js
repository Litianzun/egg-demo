const Service = require('egg').Service;

class TopicService extends Service {
    async find(uid){
        const topic = await this.app.mysql.get('topic',{id: uid});
        return {topic}
    }
}

module.exports = TopicService