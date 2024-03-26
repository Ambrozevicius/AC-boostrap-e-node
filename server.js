const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/add.html');
});

app.post('/add', (req, res) => {

    res.send('Artigo adicionado com sucesso!');
});

app.get('/filter', (req, res) => {
    res.sendFile(__dirname + '/filter.html');
});

app.get('/articles', (req, res) => {
    res.sendFile(__dirname + '/articles.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});