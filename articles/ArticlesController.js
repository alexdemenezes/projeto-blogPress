const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');

router.get('/articles', (req, res) => {
  res.send('rota de artigos');
});

router.get('/admin/articles/new', async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.render('admin/articles/new', { categories });

  } catch (e) {

  }
});

module.exports = router;
