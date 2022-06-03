const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
  res.send('rota de artigos');
});

router.get('/admin/articles/new', async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.render('admin/articles/new', { categories });
  } catch (e) {
    return res.render('admin/articles');
  }
});

router.post('/articles/save', async (req, res) => {
  try {
    const { title, body, category } = req.body;
    await Article.create({
      title,
      slug: slugify(title),
      body,
      categoryId: category
    })
    return res.redirect('/admin/articles')
  } catch (e) {
    return res.redirect('/admin/articles')
  }
});















module.exports = router;
