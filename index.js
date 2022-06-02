const express = require('express');
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const categoriesController = require('./categories/CategoriesController.js');
const articlesController = require('./articles/ArticlesController');
const Article = require('./articles/Article');
const Category = require('./categories/Category');


// View engine
app.set('view engine', 'ejs');

// static
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso');
  })
  .catch(() => {
    console.log('Erro de conexão')
  })


// routes
app.use('/', categoriesController);
app.use('/', articlesController);




app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
