const request = require('superagent');
const jwt = require('jsonwebtoken');

function authenticate(email, password, cb) {
  request
    .post(`${process.env.NORTHSTAR_URL}/v2/auth/token`)
    .send({
      grant_type: 'password',
      client_id: process.env.NORTHSTAR_CLIENT_ID,
      client_secret: process.env.NORTHSTAR_CLIENT_SECRET,
      username: email,
      password: password
    })
    .end((err, res) => {
      if (err || res.statusCode !== 200) {
        cb(false);
        return;
      }

      const token = jwt.decode(res.body.access_token);
      cb(token.role == 'admin' || token.role == 'staff');
    });
}

module.exports = router => {

  router.get('/', function(req, res) {
    if (req.onboarding && req.onboarding.authenticated === 'true') {
      res.redirect('/admin');
      return;
    }

    res.render('index', {
      header: {
        title: "Onboarding service",
        subtitle: "Please login to continue."
      },
      auth: false
    });
  });

  router.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.redirect('/');
      return;
    }

    authenticate(email, password, validated => {
      if (validated) {
        req.onboarding.authenticated = 'true';
        res.redirect('/admin');
      }
      else {
        req.onboarding.authenticated = 'false';
        res.redirect('/');
      }
    });
  });

  router.get('/logout', function(req, res) {
    req.onboarding.reset();
    res.redirect('/');
  });

}
