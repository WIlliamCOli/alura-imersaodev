import { getTodosPosts, criarPost } from "../models/postsModel.js"; // Importa as funções para obter todos os posts e criar um novo post do modelo de posts.
import fs from "fs"; // Importa o módulo do sistema de arquivos para realizar operações com arquivos.

export async function listarPosts(req, res) {
  // **Função assíncrona para listar todos os posts:**
  const posts = await getTodosPosts(); // Chama a função para obter todos os posts do banco de dados.
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts em formato JSON.
};

export async function postarNovoPost(req, res) {
  // **Função assíncrona para criar um novo post:**
  const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição.
  try {
    const postCriado = await criarPost(novoPost); // Chama a função para criar um novo post no banco de dados.
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (OK) e o post criado.
  } catch (erro) {
    // Captura e trata possíveis erros durante a criação do post.
    console.error(erro.message); // Imprime a mensagem de erro no console.
    res.status(500).json({ "Erro": "Falha na requisição!" }); // Envia uma resposta de erro com status 500 (Internal Server Error).
  }
};

export async function uploadImagem(req, res) {
  // **Função assíncrona para fazer upload de uma imagem e criar um novo post:**
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Utiliza o nome original do arquivo como URL da imagem.
    alt: ""
  };
  try {
    const postCriado = await criarPost(novoPost); // Cria um novo post no banco de dados.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Gera um novo nome para o arquivo da imagem.
    fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo para o novo nome.
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (OK) e o post criado.
  } catch (erro) {
    // Captura e trata possíveis erros durante o upload da imagem e criação do post.
    console.error(erro.message); // Imprime a mensagem de erro no console.
    res.status(500).json({ "Erro": "Falha na requisição!" }); // Envia uma resposta de erro com status 500 (Internal Server Error).
  }
};