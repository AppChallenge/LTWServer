module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });

  router.post('/sendNotification', function(req, res){
    app.sendNotification(function(err, result){
      res.render('profile', {
        username: app.models.AccessToken,
        result: result
      });
    });
    // res.render('profile', {
    //     username: app.models.AccessToken,
    //     result: "still sending"
    //   });
  });

  router.get('/profile', function(req, res) {
    res.render('profile');
  });

  router.post('/profile', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.User.login({
      email: email,
      password: password
    }, 'user', function(err, token) {
      if (err)
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });

      token = token.toJSON();

      res.render('profile', {
        username: token.user.username,
        accessToken: token.id,
        result: ""
      });
    });
  });

  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query.access_token});
    token.destroy();

    res.redirect('/');
  });

  app.use(router);
};