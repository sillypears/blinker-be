const fastify = require('fastify')()
require('dotenv').config()

fastify.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: process.env.BLINK_MONGOURI
})

fastify.get('/count/:sort?', async function(req, reply) {
  let sortDir = -1
  if (req.params.sort) {
      sortDir = req.params.sort
    } 
    const counts = this.mongo.db.collection(process.env.BLINK_MONGOCOL).find({}).sort({theTime: sortDir}).toArray()
    return counts
})

fastify.listen({  port: 3000 }, err => {
  if (err) throw err
})