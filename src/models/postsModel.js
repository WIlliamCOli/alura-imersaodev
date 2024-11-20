import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO. 
// A palavra-chave 'await' indica que a função é assíncrona e aguarda a conclusão da conexão antes de continuar.

export default async function getTodosPosts() {
  // Função assíncrona para buscar todos os posts do banco de dados.
  const db = conexao.db("imersao-instabytes");
  // Obtém o banco de dados com o nome "imersao-instabytes" a partir da conexão estabelecida.
  const colecao = db.collection("posts");
  // Obtém a coleção "posts" dentro do banco de dados.
  return colecao.find().toArray();
  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
};
