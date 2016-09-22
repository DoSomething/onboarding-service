const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/@dosomething/forge/dist')));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const apiRouter = express.Router();
const api = require('./lib/api')(apiRouter);
app.use('/api/v1', apiRouter);

const adminRouter = express.Router();
const admin = require('./lib/admin')(adminRouter);
app.use('/admin', admin);

app.listen(process.env.PORT, function() {
  console.log("Listening on " + process.env.PORT);
});

/**
 * onboarding document
 * experience (signup new user, signup existing user, nth signup, spotlight signup)
 * enabled / disabled
 * slides (array) --> these are embedded documents, could be re-usable. order in array is order to be presented.
 *
 * slides document
 * elements (array) --> these are embedded documents, could be re-usable. order in array is order to be presented.
 *
 */
