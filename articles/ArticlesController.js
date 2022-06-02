const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
  res.send('rota de artigos');
});

router.get('/admin/articles/new', (req, res) => {
  res.send('rotas para criar artigos')
});

module.exports = router;
