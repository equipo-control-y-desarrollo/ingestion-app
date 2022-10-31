import fastify from 'fastify'
import dotenv from 'dotenv'
import autoLoad from '@fastify/autoload'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import path from 'path'


dotenv.config()

const server = fastify({ logger: true })

server.register(helmet)

server.register(cors)

server.register(autoLoad, {
    dir: path.resolve(__dirname, '../src/plugins')
});

server.register(autoLoad, {
    dir: path.resolve(__dirname, '../src/routes')
});

//Auth
server.register(require('@fastify/jwt'), {
  secret: +process.env.JWT_SECRET
})

const port = +process.env.PORT || 3000

server.listen({ port: port }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })