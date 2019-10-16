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

fastify.get('/', (request, reply) => {
  reply.redirect('https://github.com/ejnshtein/nyaasi-magnet-redirect')
})

fastify.get('/magnet/*', async (request, reply) => {
  reply.redirect(request.req.url.replace('/magnet/', ''))
})
fastify.get('/nyaamagnet/*', async (request, reply) => {
  const xt = request.req.url.replace('/nyaamagnet/', '')
  reply.redirect(`magnet:?xt=${xt}&${qs.stringify({ tr })}`)
})

fastify.get('/sukebeimagnet/*', async (request, reply) => {
  const xt = request.req.url.replace('/sukebeimagnet/', '')
  reply.redirect(`magnet:?xt=${xt}&${qs.stringify({ tr: trSukebei })}`)
})

fastify.listen(port, '0.0.0.0', err => {
  if (err) console.log(`Startup error: ${err.message}\n\n${err.stack}`)

  console.log(`Started on port - ${port}`)
})
