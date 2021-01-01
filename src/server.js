import express from "express"
import bodyParser from "body-parser"

const informacoesArtigo = {
"aprenda-react" : {
    curtidas: 0,
},
"aprenda-node" : {
    curtidas: 0,
},
"my-thoughts-on-resumes" : {
    curtidas: 0,
}
}

const app = express()

app.use(bodyParser.json())

app.get('/hello',(req, res) => res.send('Hello!'))
app.get('/hello/:nome',(req, res) => res.send(`Hello ${req.params.nome}!`))
app.post('/hello',(req, res) => res.send(`Hello! ${req.body.nome}`))

app.listen(8001, () => console.log('Escutando na porta 8001'))