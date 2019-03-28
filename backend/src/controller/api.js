


let axios = require('axios')

const ApiController = {
  async logout(ctx,next){
    ctx.cookies.set('skey','',{})
    return ctx.body = 'success';
  }
}

module.exports = ApiController
