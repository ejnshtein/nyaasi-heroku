const fastify = require('fastify')()
const qs = require('querystring')
const port = process.env.PORT || 80
const tr = [
  'http://nyaa.tracker.wf:7777/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://tracker.coppersurfer.tk:6969/announce',
  'udp://exodus.desync.com:6969/announce'
]

const trSukebei = [
  'http://sukebei.tracker.wf:8888/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://tracker.coppersurfer.tk:6969/announce',
  'udp://exodus.desync.com:6969/announce'
]

fastify
  .register(require('fastify-cors'), {
    origin: (res, next) => next(null, true)
  })
  .register(require('fastify-http-proxy'), {
    upstream: 'https://nyaa.si',
    prefix: '/nyaasi'
  })

fastify.get('/', (request, reply) => {
  reply.redirect('https://github.com/ejnshtein/nyaasi-heroku')
})

fastify.get('/nyaamagnet/*', async (request, reply) => {
  const xt = request.req.url.replace('/nyaamagnet/', '')
  reply.redirect(`magnet:?xt=${xt}&${qs.stringify({ tr })}`)
})

fastify.get('/sukebeimagnet/*', async (request, reply) => {
  const xt = request.req.url.replace('/sukebeimagnet/', '')
  reply.redirect(`magnet:?xt=${xt}&${qs.stringify({ tr: trSukebei })}`)
})

fastify.listen(port, '0.0.0.0')
  .then(() => {
    console.log(`Started on port - ${port}`)
  })
  .catch(err => {
    console.log(`Startup error: ${err.message}\n\n${err.stack}`)
  })
