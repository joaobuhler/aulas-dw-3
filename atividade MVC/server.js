import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './src/routes/tarefa.routes.js'

const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
})

server.register(tarefaRoutes)

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'Rota não encontrada'
  })
})

server.listen({ port: 3000 }).then(() => {
  console.log('Servidor rodando na porta 3000')
})