import express from "express"
import bodyParser from "body-parser"

const informacoesArtigo = {
"aprenda-react" : {
    curtidas: 0,
    comentarios: [],
},
"aprenda-node" : {
    curtidas: 0,
    comentarios: [],
},
"my-thoughts-on-resumes" : {
    curtidas: 0,
    comentarios: [],
}
}

const app = express()

app.use(bodyParser.json())

app.post('/api/artigos/:nome/curtida', (req, res) => {
    const nomeArtigo = req.params.nome;
    informacoesArtigo[nomeArtigo].curtidas += 1;
    res.status(200).send(`${nomeArtigo} agora tem ${informacoesArtigo[nomeArtigo].curtidas} curtidas`);
})
app.post("/api/artigos/:nome/novo-comentario", (req, res) => {
    const {nomeUsuario, texto} = req.body;
    const nomeArtigo = req.params.nome;
    informacoesArtigo[nomeArtigo].comentarios.push({nomeUsuario, texto});
    res.status(200).send(informacoesArtigo[nomeArtigo]);
})

app.listen(8001, () => console.log('Escutando na porta 8001'))