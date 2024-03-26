const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Página de adicionar novo artigo
app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/add.html');
});

// Endpoint para adicionar novo artigo
app.post('/add', (req, res) => {
    // Lógica para adicionar o novo artigo ao arquivo JSON
    // Você precisará implementar essa lógica
    res.send('Artigo adicionado com sucesso!');
});

// Página de filtrar artigos
app.get('/filter', (req, res) => {
    res.sendFile(__dirname + '/filter.html');
});

// Página de visualização de todos os artigos
app.get('/articles', (req, res) => {
    res.sendFile(__dirname + '/articles.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});