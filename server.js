const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const articlesFile = './articles.json';


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/artigo', (req, res) => {
    res.sendFile(__dirname + '/articles.json');
});

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/add.html');
});

app.post('/add', (req, res) => {
    const newArticle = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    };

    fs.readFile(articlesFile, (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo de artigos:', err);
            res.status(500).send('Erro ao adicionar artigo.');
            return;
        }

        let articles = JSON.parse(data);
        articles.push(newArticle);

        fs.writeFile(articlesFile, JSON.stringify(articles, null, 2), (err) => {
            if (err) {
                console.error('Erro ao escrever arquivo de artigos:', err);
                res.status(500).send('Erro ao adicionar artigo.');
                return;
            }
            res.send('Artigo adicionado com sucesso!');
        });
    });
});


const articlesPath = path.join(__dirname, 'articles.json');
 
const articlesData = fs.readFileSync(articlesPath, 'utf-8');
const articles = JSON.parse(articlesData);

function buscarArtigoPorCategoria(category) {
 
    return articles.find(articles =>
        articles.category.toLowerCase() === category.toLowerCase());
}


app.get('/buscar-categoria/:category', (req, res) => {
 
    const categoriaDoArtigoBuscado = req.params.category;
 
    const artigoEncontrado = buscarArtigoPorCategoria(categoriaDoArtigoBuscado);
 
    if (artigoEncontrado) {
 
        res.send(`<h1>Artigo encontrado:</h1><pre>
    ${JSON.stringify(artigoEncontrado, null, 2)}</pre>`)
    } else {
        res.send('<h1>Artigo não encontrado.</h1>')
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
