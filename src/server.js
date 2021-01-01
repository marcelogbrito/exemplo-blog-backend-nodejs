import express from "express"

const app = express()

app.get('/hello',(req, res) => res.send('Hello!'))

app.listen(8001, () => console.log('Escutando na porta 8001'))