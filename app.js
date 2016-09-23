const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/@dosomething/forge/dist')));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: [__dirname + '/views/partials'],
  helpers: {
  }
}));
app.set('view engine', 'handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const auth = require('./lib/auth');
const cookieParser = require('cookie-parser');

app.get('/', function(req, res) {
  res.render('index', {
    header: {
      title: "Onboarding service",
      subtitle: "Please login to continue."
    },
    auth: false
  });
});

app.post('/login', cookieParser(), function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.redirect('/');
    return;
  }

  auth(email, password, validated => {
    if (validated) {
      res.cookie('authenticated', true).redirect('/admin');
    }
    else {
      res.redirect('/');
    }
  });
});

app.get('/logout', cookieParser(), function(req, res) {
  res.cookie('authenticated', false).redirect('/');
});

const apiRouter = express.Router();
const api = require('./lib/api')(apiRouter);
app.use('/api/v1', apiRouter);

const adminRouter = express.Router();
const admin = require('./lib/admin')(adminRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, function() {
  console.log("Listening on " + process.env.PORT);
});
