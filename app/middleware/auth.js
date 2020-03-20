const jwt = require("koa-jwt");
const {secret} = require('../secret')

const auth = jwt({secret})

module.exports = (options,app) => {
    return auth;
}