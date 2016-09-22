const db = require('./db');

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

    res.json({
      'config': {
        'enabled': true,
        'developerMode': true,
        'campaignEnabled': true,
      },
      'slides': ['ContextSlide', 'InstructionSlide', 'ReportbackItemsSlide', 'CampaignSlide']
    });
  });

}
