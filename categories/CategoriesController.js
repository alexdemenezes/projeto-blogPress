const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get('/admin/categories', async (req, res) => {
  const categories = await Category.findAll()
  return res.render('admin/categories/index', { categories });
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
    return res.redirect('/admin/categories');
  }
  return res.redirect("/admin/categories/new");
});

router.post('/categories/delete', async (req, res) => {
    const { id } = req.body;

    if(id){
      if (!isNaN(id)) {
        await Category.destroy({
          where: {
            id
          }
        })
        return res.redirect('/admin/categories');
      } else {
        return res.redirect('/admin/categories');
      }

    } else {
      res.redirect('/admin/categories')
    }
});

router.get('/admin/categories/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if(isNaN(id)){
      return res.redirect('/admin/categories/');
    }

    const category = await Category.findByPk(id);
    if(category){
      res.render('admin/categories/edit', { category });
    } else {
      res.redirect('/admin/categories');
    }
  } catch (e) {
    res.redirect('/admin/categories');
  }
});

router.post('/categories/update', async (req, res) => {
  try {
    const { id, title } = req.body;
    await Category.update({ title, slug: slugify(title) }, {
      where: {
        id
      }
    });
    return res.redirect('/admin/categories');
  } catch (e) {
    return res.redirect('/admin/categories');
  }
});





module.exports = router;
