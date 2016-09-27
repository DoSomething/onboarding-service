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

const authRouter = express.Router();
const auth = require('./lib/auth');
app.use('/', auth);

const apiRouter = express.Router();
const api = require('./lib/api')(apiRouter);
app.use('/api/v1', apiRouter);

const adminRouter = express.Router();
const admin = require('./lib/admin')(adminRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on " + process.env.PORT);
});
