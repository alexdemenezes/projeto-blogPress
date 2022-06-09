const express = require('express');
const session = require('express-session');
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const categoriesController = require('./categories/CategoriesController.js');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/UsersController');


// View engine
app.set('view engine', 'ejs');

// 1s - 1000 ms
// 60s - 60000 ms

// Sessions

// Redis - banco de dados focado em salvamentos de sessoes e cache

app.use(session({
  secret: 'jsgdhhksagdsah', cookie: { maxAge:  60000 }
}));

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
app.use('/', usersController);




app.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    const articles = await Article.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: 2,
      include: [ { model: Category } ]
    });
    return res.render('index', { articles, categories });

  } catch (e) {
    return res.redirect('/');
  }
});

app.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const categories = await Category.findAll();
    const article = await Article.findOne({
      where: {
        slug,
      }
    });
  if(article) {
    return res.render('article', { article, categories });
  } else {
    return res.redirect('/');
  }
  } catch (e) {
    return res.redirect('/');
  }
});

app.get('/category/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const categories = await Category.findAll();
    const category = await Category.findOne({
      where: {
        slug,
      },
      include: [{ model: Article }]
    });

    if(category) {
      return res.render('index', {categories, articles: category.articles})
    }
    return res.redirect('/');

  } catch (e) {
    return res.redirect('/');
  }
});



















app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
