const request = require('superagent');

module.exports = (email, password, cb) => {
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
      cb(err || res.statusCode === 200);
    });
}
