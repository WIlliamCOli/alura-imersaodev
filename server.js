import express from "express"

const posts = [
{
    descrição: 'Uma foto teste',
    imagem: 'https://placecats.com/millie/300/150',
    id: 1,
},
{
    descrição: 'Gato fofinho dormindo',
    imagem: 'https://placecats.com/millie/300/150',
    id: 2,
},
{
    descrição: 'Gato fazendo panqueca',
    imagem: 'https://placecats.com/millie/300/150',
    id: 3,
},
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    res.status(200).json(posts[index]);
});
