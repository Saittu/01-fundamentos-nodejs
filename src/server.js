import http from 'node:http';
import { json } from './middlewares/json.js';

// GET => Buscar um recurso do back-end
//POST => Criar um recurso no back-end
//PUT => atualizar um recurso no back-end
//PATCH => atualizar uma informação especica de um recurso no back-end
//DELETE => deletar um recuso no back-end

//GET /users => buscando usuários do back-end
//POST /users => Criar usuário no back-end

//Stateful (salva na aplicação) -  Stateless (salva fora da aplicação (banco de dados) )

// Cabeçalhos (requisição/resposta) => metadados (como um dado pode ser interpretado)

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if ( method === 'GET' && url === '/users'){

        return res
            .setHeader('content-type', 'application/json')
            .end(JSON.stringify(users))
    } 

    if ( method === 'POST' && url === '/users'){
        const { id, name, email} = req.body
 
        users.push({
            id,
            name,
            email,
        })

        return res.writeHead(201).end()
    }  

    return res.writeHead(404).end('not found')
})

server.listen(3333)

//localhost:333

