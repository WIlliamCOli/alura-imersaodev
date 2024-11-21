import express from "express"; // Importa o framework Express.js para criar a aplicação web.
import multer from "multer"; // Importa a biblioteca Multer para lidar com uploads de arquivos.
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js"; // Importa as funções controladoras para posts.

const storage = multer.diskStorage({
  // Configura o armazenamento dos arquivos enviados nas requisições.
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado pelo cliente.
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com as configurações de armazenamento.

const routes = (app) => {
  // Define as rotas da aplicação.

  // Habilita o middleware para analisar corpos de requisições em formato JSON.
  app.use(express.json());

  // Rota GET para listar todos os posts.
  // O endpoint '/posts' será tratado pela função 'listarPosts' importada do controller.
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post.
  // O endpoint '/posts' será tratado pela função 'postarNovoPost' importada do controller.
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem.
  // O endpoint '/upload' utilizará o middleware 'upload.single("imagem")' para tratar o upload de um único arquivo chamado 'imagem'.
  // A função 'uploadImagem' importada do controller será responsável por processar a imagem após o upload.
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes; // Exporta a função 'routes' para ser utilizada em outro arquivo.