const fastify = require('fastify')()
require('dotenv').config()

fastify.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: process.env["BLINK_MONGOURI"]
})

fastify.get('/count/:sort?', async function(req, reply) {
  let sortDir = -1
  let daysLeft = 7
  if (req.params.sort) {
    sortDir = req.params.sort
  }
  if (req.query.days) {
    if (req.query.days > 0){
      daysLeft = req.query.days
    }}
  let nDate = new Date()
  nDate.setDate(nDate.getDate()-daysLeft)
  const counts = this.mongo.db.collection(process.env.BLINK_MONGOCOL).find({theTime:{$gte:nDate}}).sort({ theTime: sortDir }).toArray()
  return counts
})

fastify.get('/', async function(req, reply) {
  return { status: "OK", message: "Hello" }

})
fastify.listen({ host: "0.0.0.0", port: 3000 }, err => {
  if (err) throw err
})