module.exports = {
  parseConfig: function(reply) {

    if (!reply) {
      reply = {enabled: 'false', developerMode: 'false', disabledCampaigns: ''};
    }
    else {
      reply = JSON.parse(reply.toString());
    }

    const vars = {
      enabled: (reply.enabled === 'true'),
      developerMode: (reply.developerMode === 'true'),
      disabledCampaigns: reply.disabledCampaigns.split(',')
    };

    return vars;
  }
}
