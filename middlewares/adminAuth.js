function adminAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.redirect('/');
  }
}

module.exports = adminAuth;
