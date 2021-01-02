import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

app.use(bodyParser.json());

app.get("/api/artigos/:nome", async (req, res) => {
  try {
    const nomeArtigo = req.params.nome;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    const db = client.db("meu-blog");
    const informacoesArtigo = await db
      .collection("artigos")
      .findOne({ nome: nomeArtigo });
    res.status(200).json(informacoesArtigo);
    //fecha conexao do banco de dados
    client.close();
  } catch (error) {
    res
      .status(500)
      .json({ message: "erro na conexao ao banco de dados: ", error });
  }
});

app.post("/api/artigos/:nome/curtida", async (req, res) => {
  try {
    const nomeArtigo = req.params.nome;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true, useUnifiedTopology: true 
    });
    const db = client.db("meu-blog");
    const informacoesArtigo = await db
      .collection("artigos")
      .findOne({ nome: nomeArtigo });
    await db.collection("artigos").updateOne({
      nome: nomeArtigo},{
      '$set': {
        curtidas: informacoesArtigo.curtidas + 1,
      },
    });
    const informacoesArtigoAtualizada = await db
      .collection("artigos")
      .findOne({ nome: nomeArtigo });

    res.status(200).json(informacoesArtigoAtualizada);
    client.close();
  } catch (error) {
    res
      .status(500)
      .json({ message: "erro na conexao ao banco de dados: ", error });
  }
});
app.post("/api/artigos/:nome/novo-comentario", (req, res) => {
  const { nomeUsuario, texto } = req.body;
  const nomeArtigo = req.params.nome;
  informacoesArtigo[nomeArtigo].comentarios.push({ nomeUsuario, texto });
  res.status(200).send(informacoesArtigo[nomeArtigo]);
});

app.listen(8001, () => console.log("Escutando na porta 8001"));
