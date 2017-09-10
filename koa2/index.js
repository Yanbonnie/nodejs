const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()

/*路由中间键 */
const Router = require('koa-router')

/*请求数据获取中间键 */
const bodyParser = require('koa-bodyparser')
//使用ctx.body解析中间件
app.use(bodyParser());

/*koa-static中间键 */
const static = require('koa-static')
//静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
app.use(static(
  path.join(__dirname,staticPath)
))

//模板引擎
const views = require('koa-views')
//加载模板引擎
app.use(views(path.join(__dirname,'./view'),{
  extension:'ejs'
}))
/*app.use(async(ctx)=>{
  let title = 'hello koa2'
  await ctx.render('a',{
    title,
  })
})*/

let home = new Router();
// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>  ff   
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
      <li><a href="/page/ejs">/page/ejs</a></li>      
    </ul>
    <h1>koa2 request post demo</h1>
      <form method="POST" action="/page/helloworld">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{

}).post('/helloworld', async ( ctx )=>{
  // ctx.body = 'helloworld page!'
    let postData = ctx.request.body
    ctx.body = postData;
}).get('/ejs',async(ctx)=>{
    let title = 'hello koa2'
    await ctx.render('a',{
      title,
    })
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})