module.exports = function(app) {
  var router = app.loopback.Router();

  router.post('/send_notification', function(req, res){
    console.log(req);
    app.sendNotification(req.body, function(err, result){
      if(err){
        console.log(err);
      }
      res.send(result);
    });
    
  });

  router.post('/profile', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.User.login({
      email: email,
      password: password
    }, 'user', function(err, token) {
      if (err)
        return res.send({
          email: email,
          password: password,
          loginFailed: true
        });

      token = token.toJSON();
      res.send({
        loginFailed: false,
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

    res.send({
      success: true
    });
  });

  app.use(router);
};