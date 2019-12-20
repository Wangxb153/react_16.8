const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = new Koa()
const router = new Router()

// router.get('/test/:id', (ctx) => {
//   // ctx.body = `<p>request111 /test ${ctx.params.id}</p>` // 返回html数据
//   ctx.body = { success: true }
//   ctx.set('Content-Type', 'application/json')
// })
// // 第一个中间件，不做任何的处理
// server.use(async (ctx, next) => {
//   await next()
// })
// // 第二个中间件，对router中的返回进行处理
// server.use(router.routes())
app.prepare().then( () => {
  const server = new Koa()
  // koa使用中间件
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})

// // 最简单的koa中间件
// const server = new Koa()

// server.use(async (ctx, next) => { // 一般使用async，因为一般都是异步的请求
//   const path = ctx.path  // 获取请求的路径
//   const method = ctx.method // 获取请求的方式
//   ctx.body = `<span>Koa Render ${method} ${path}</span>` // 返回客户端的数据

//   await next() // 调用next，在执行完这个中间件后，调用下一个中间件
// })

// koaRouter就是封装好的中间件