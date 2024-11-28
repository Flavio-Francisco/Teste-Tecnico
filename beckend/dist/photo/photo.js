"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = imageRoutes;
const prisma_1 = __importDefault(require("../types/prisma"));
const fastify_multipart_1 = __importDefault(require("fastify-multipart"));
async function imageRoutes(server) {
    // Registrar o plugin `fastify-multipart` dentro da função
    server.register(fastify_multipart_1.default);
    server.post('/upload', async (request, reply) => {
        try {
            const data = await request.file(); // Processa o arquivo enviado
            if (!data) {
                return reply.status(400).send({ error: 'Arquivo não enviado!' });
            }
            const fileBuffer = await data.toBuffer(); // Obtém o conteúdo do arquivo
            const fileName = data.filename;
            console.log('Foto enviada:', fileName);
            // Salvar informações no banco
            const image = await prisma_1.default.driver.create({
                data: {
                    available: false,
                    car: '',
                    description: '',
                    kilometers: 0,
                    name: '',
                    photo: fileName, // Aqui salva o nome da imagem ou você pode salvar o buffer
                },
            });
            reply.send({ message: 'Imagem salva com sucesso!', id: image.id });
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ error: 'Erro ao processar o upload da imagem.' });
        }
    });
}
