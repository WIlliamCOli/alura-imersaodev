import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados, definida em dbConfig.js.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// **Estabelece a conexão com o banco de dados:**
// - Utiliza a função `conectarAoBanco` para criar a conexão.
// - A string de conexão é obtida da variável de ambiente `STRING_CONEXAO`.
// - A palavra-chave `await` garante que a conexão seja estabelecida antes de continuar.

export async function getTodosPosts() {
  // **Função assíncrona para buscar todos os posts:**
  const db = conexao.db("imersao-instabytes");
  // - Obtém o banco de dados específico ('imersao-instabytes') da conexão estabelecida.
  const colecao = db.collection("posts");
  // - Seleciona a coleção 'posts' dentro do banco de dados.
  return colecao.find().toArray();
  // - Executa uma consulta para encontrar todos os documentos (posts) na coleção.
  // - Retorna os resultados da consulta como um array.
};

export async function criarPost(novoPost) {
  // **Função assíncrona para criar um novo post:**
  const db = conexao.db("imersao-instabytes");
  // - Obtém o banco de dados específico ('imersao-instabytes') da conexão estabelecida.
  const colecao = db.collection("posts");
  // - Seleciona a coleção 'posts' dentro do banco de dados.
  return colecao.insertOne(novoPost);
  // - Insere um novo documento (post) na coleção.
  // - Retorna um objeto que representa o resultado da operação de inserção.
}

export async function atualizarPost(id, novoPost){
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
};
