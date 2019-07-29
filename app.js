const fastify = require('fastify')()
const port = process.env.PORT || 80

fastify.get('/', (request, reply) => {
  reply.redirect('https://github.com/ejnshtein/nyaasi-bot')
})

fastify.get('/magnet/*', async (request, reply) => {
  reply.redirect(request.req.url.replace('/magnet/', ''))
})

fastify.listen(port, '0.0.0.0', err => {
  if (err) console.log(`Startup error: ${err.message}\n\n${err.stack}`)

  console.log(`Started on port - ${port}`)
})
