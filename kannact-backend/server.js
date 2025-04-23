import jsonServer from "json-server"
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

const port = 3000

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
