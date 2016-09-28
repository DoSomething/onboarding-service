// const db = require('./db');
const redis = require('./redis');
const util = require('./util');

module.exports = router => {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
    res.header('Access-Control-Request-Method', '*')
    res.header('Access-Control-Request-Headers', '*')
    next();
  });

  router.get('/config/:nid', (req, res) => {
    const nid = req.params['nid'];

    redis.get('onboarding', (err, reply) => {
      if (err || !reply) {
        res.status(500).send("Error fetching config");
        return;
      }

      const vars = util.parseConfig(reply);

      res.json({
        'config': {
          'enabled': vars.enabled,
          'developerMode': vars.developerMode,
          'campaignEnabled': vars.disabledCampaigns.indexOf(nid) === -1,
        },
        'slides': ['ContextSlide', 'InstructionSlide', 'ReportbackItemsSlide', 'CampaignSlide']
      });
    });
  });

}
