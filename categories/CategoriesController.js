const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get('/categories', (req, res) => {
  return res.send('categioria');
});

router.get('/admin/categories/new', (req, res) => {
  return res.render('admin/categories/new');
});

router.post('/categories/save', async (req, res) => {
  const {
    title
  } = req.body;
  console.log(title);

  if (title) {
    await Category.create({
  title,
  slug: slugify(title)
});

    return res.redirect('/');
  }
  return res.redirect("/admin/categories/new");
});




module.exports = router;
