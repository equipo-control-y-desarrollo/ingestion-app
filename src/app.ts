import fastify from 'fastify'
import dotenv from 'dotenv'
import autoLoad from '@fastify/autoload'
import path from 'path'


dotenv.config()

const server = fastify({ logger: true })

console.log(__dirname)

server.register(autoLoad, {
    dir: path.resolve(__dirname, '../src/plugins')
});

server.register(autoLoad, {
    dir: path.resolve(__dirname, '../src/routes')
});

const port = +process.env.PORT || 3000

server.listen({ port: port }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })