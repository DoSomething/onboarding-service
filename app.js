const express = require('express');
const app = express();

const sessions = require('client-sessions');
app.use(sessions({
  cookieName: 'onboarding',
  secret: process.env.COOKIE_SECRET, // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/@dosomething/forge/dist')));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: [__dirname + '/views/partials'],
  helpers: {
    isProduction: opts => {
      return process.env.PRODUCTION_ASSETS === undefined ? opts.inverse(this) : opts.fn(this);
    }
  }
}));
app.set('view engine', 'handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const authRouter = express.Router();
const auth = require('./lib/auth')(authRouter);
app.use('/', authRouter);

const apiRouter = express.Router();
const api = require('./lib/api')(apiRouter);
app.use('/api/v1', apiRouter);

const adminRouter = express.Router();
const admin = require('./lib/admin')(adminRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, function() {
  console.log("Listening on " + process.env.PORT);
});
