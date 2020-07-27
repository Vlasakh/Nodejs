const post = (req, res) => {
  console.log('req', req.body);

  // todo: create the model

  res.redirect('/courses');
};

module.exports = {
  post,
};
