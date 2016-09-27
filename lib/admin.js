const cookieParser = require('cookie-parser');
const redis = require('./redis');
const util = require('./util');

module.exports = router => {

  router.use(cookieParser(process.env.COOKIE_SECRET));

  router.use(function(req, res, next) {
    if (!req.cookies || req.cookies.authenticated != 'true') {
      res.redirect('/');
      return;
    }

    next();
  });

  router.get('/', function(req, res) {
    res.render('admin', {
      header: {
        title: "Flows",
        subtitle: "Configure onboarding flows."
      },
      auth: true
    });
  });

  router.get('/variables', function(req, res) {
    redis.get('onboarding', (err, reply) => {
      if (err || !reply) {
        res.status(500).send("Error fetching config");
        return;
      }

      const vars = util.parseConfig(reply);

      res.render('variables', {
        header: {
          title: "Varaibles",
          subtitle: "Want it on or off?"
        },
        auth: true,
        vars: vars
      });
    });
  });

  router.post('/variables', function(req, res) {
    const vars = {
      enabled: req.body.onboardingToggle,
      developerMode: req.body.developerToggle,
      disabledCampaigns: req.body.disabledCampaigns
    };

    if (vars.enabled === undefined || vars.developerMode === undefined || vars.disabledCampaigns === undefined) {
      res.status(400).send("Missing parameters");
      return;
    }

    redis.set('onboarding', JSON.stringify(vars));
    res.redirect('/admin/variables');
  });

}
