const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  return res.send('categioria');
});

router.get('/admin/categories/new', (req, res) => {
  res.send('rota para criar um novo artigo');
})

module.exports = router;
