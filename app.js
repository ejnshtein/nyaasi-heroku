const fastify = require('fastify')()
const port = process.env.PORT || 80

fastify.get('/', (request, reply) => {
  reply.redirect('https://github.com/ejnshtein/nyaasi-bot')
})

fastify.get('/magnet/*', async (request, reply) => {
  reply.redirect(request.req.url.replace('/magnet/', ''))
})

const start = async () => {
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
