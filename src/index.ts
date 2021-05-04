import fastify, { FastifyReply, FastifyRequest } from "fastify";

const app = fastify({ logger: true });

class IndexController {
    index(request: FastifyRequest, reply: FastifyReply) {
        reply.send({ code: 200, message: 'ok' });
    }
}

const index = new IndexController();

app.get('/', index.index);
app.listen(8000);