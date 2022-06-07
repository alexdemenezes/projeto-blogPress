const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/admin/articles', async (req, res) => {
    const articles = await Article.findAll({
      include: [{ model: Category }]
    });
    return res.render('admin/articles/index', { articles });
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

router.post('/articles/delete', async (req, res) => {
  const { id } = req.body;
  if (id) {
    if(!isNaN(id)) {
      await Article.destroy({
        where: {
          id,
        }
      })
      return res.redirect('/admin/articles');
    }
    return res.redirect('/admin/articles');
  }
  return res.redirect('/admin/articles');
});

router.get('/admin/articles/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    const categories = await Category.findAll();
    if (article) {
      return res.render('admin/articles/edit', { categories, article });
    }
    return res.redirect('/');
  } catch (e) {
    return res.redirect('/');
  }
});

router.post('/articles/update', async (req, res) => {
  try {
    const { id, title, body, category: categoryId } = req.body;
    await Article.update({ title, body, categoryId, slug: slugify(title) }, {
      where: {
        id
      }
    });
    return res.redirect('/admin/articles')
  } catch (e) {
    return res.redirect('/');
  }
});

router.get('/articles/page/:num', async (req, res) => {
  try {
    const { num: page } = req.params;
    let offset;
    let next;

    if (isNaN(page) || +page == 1) {
      offset = 0
    } else {
       offset = (+page - 1) * 2;
    }

    const articles = await Article.findAndCountAll({
      limit: 2,
      offset,
      order: [
        ['id', 'DESC']
      ],
    });

    const categories = await Category.findAll();

    if(offset + 2 >= articles.count) {
      next = false
    } else {
      next = true;
    }
    const result = {
      page: +page,
      next,
      articles,
    }

    return res.render('admin/articles/page', {result, categories })
  } catch (e) {
    return res.render('/')
  }

});














module.exports = router;
