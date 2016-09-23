const cookieParser = require('cookie-parser');

module.exports = router => {

  router.use(cookieParser());

  router.use(function(req, res, next) {
    if (!req.cookies || req.cookies.authenticated != 'true') {
      res.redirect('/');
      return;
    }

    next();
  });

  router.get('/', function(req, res) {
    console.log(req.cookies)
    res.render('admin', {
      header: {
        title: "Flows",
        subtitle: "Configure onboarding flows."
      },
      auth: true
    });
  })

}
