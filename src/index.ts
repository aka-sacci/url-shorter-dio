const server = require('./server')
const port = 4002;

server.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})