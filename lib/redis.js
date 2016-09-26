const client = require('redis').createClient(process.env.REDIS_URL);

client.on('ready', () => {
  console.log('Redis connected');
});

client.on('error', err => {
  console.log('Redis error', err);
});

module.exports = client;
