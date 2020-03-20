module.exports = (options,app) => {
    return async function checkOwner(ctx,next){
        let currentUser = ctx.state.user
        console.log(ctx.params.id,currentUser)
        if(ctx.params.id != currentUser.id){
            ctx.throw(403,'没有权限!')
        }
        await next()
    }
}