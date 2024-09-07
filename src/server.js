import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


//GET => Buscar um recurso do back-end
//POST => Criar um recurso no back-end
//PUT => atualizar um recurso no back-end
//PATCH => atualizar uma informação especica de um recurso no back-end
//DELETE => deletar um recuso no back-end

//GET /users => buscando usuários do back-end
//POST /users => Criar usuário no back-end

//Stateful (salva na aplicação) -  Stateless (salva fora da aplicação (banco de dados) )

// Cabeçalhos (requisição/resposta) => metadados (como um dado pode ser interpretado)

//Query paramenters: URL Stateful  => Filtros, Paginação, modifcam a resposta mas não - obragatórios
//Route paramenters?: Indentificação de recurso
//Request Body: Envio de informações de um formulário (normalmente) (HTTPs)

//Query
//http://localhost:3333/users?userId=1&name=Jean

//Route
//GET http://localhost:3333/users/1
//DELETE http://localhost:3333/users/1

//Request
//POST http://localhost:3333/users

//Edição e remoção do usuário


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        //se o method batia com o method que estava la e se o path era igual a URL que estaria dentro da requisição o test retorna true ou false 
        return route.method === method && route.path.test(url)
    })

    if(route) {
        //nao quero mais retorna so um true ou false para ver se é valido ou n aqui quero realmente executar a regexe na minha url para entao ela me retornar quais foram os dados que ela encontrou em minha rota
        const routeParams = req.url.match(route.path)

        // console.log(extractQueryParams(routeParams.groups.query))

        const { query, ...params } = routeParams.groups
        req.params = params
        req.query =  query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end('not found')
})

server.listen(3333)

//localhost:333

