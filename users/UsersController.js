const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.render('admin/users/index', { users })
  } catch (e) {
    console.log('errado');
  }
});

router.get('/admin/users/create', (req, res) => {
  return res.render('admin/users/create');
});

router.post('/users/create', async (req, res) => {
  try {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await User.findOne({
      where: {
        email,
      }
    });

    if(user) {
      return res.redirect('/admin/users/create')
    } else {
      await User.create({
        email,
        password: hash
      });

      return res.redirect('/');
    }

  } catch (e) {
    res.redirect('/');
  }
});


router.get('/login', (req, res) => {
  return res.render('/admin/users/login');
});

router.post('/authenticate', (req, res) => {
  try {
    const { email, password } = req.body;


    const user = User.findOne({
      where: {
      email,
    }});

    if(user) {
      const correct = bcrypt.compareSync(password, user.password);
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        return res.json(req.session.user);
      } else {
        return res.redirect('/login');
      }
    } else {
      return res.redirect('/login');
    }
  } catch (e) {
    return res.redirect('/login');
  }
});












module.exports = router;
