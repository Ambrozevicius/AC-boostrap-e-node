const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const articlesFile = './articles.json';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/add.html');
});

app.post('/add', (req, res) => {
    const newArticle = {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category // Adicionando a categoria ao objeto do artigo
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

app.get('/filter', (req, res) => {
    res.sendFile(__dirname + '/filter.html');
});

app.get('/articles', (req, res) => {
    fs.readFile(articlesFile, (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo de artigos:', err);
            res.status(500).send('Erro ao buscar artigos.');
            return;
        }
        const articles = JSON.parse(data);
        res.send(articles);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
