const error = require('koa-json-error')
module.exports = (options,app) => {
    return error(options)
}