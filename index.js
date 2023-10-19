// Import ExpressJS framework
import express from 'express';

//Setup handlebars
import exphbs  from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';


// Import modules
import waiterAvailabilityApp from './routes/water_appRoutes.js';
import WaitersAvailabilityFactory from './js/waiterObj.js';
import Query from './services/query.js';

const pgp = pgPromise();
const connectionString = "postgres://rgyjyktk:3gSnt5rJoAo9ktvrpqMENiDvZhGkY1NN@mahmud.db.elephantsql.com/rgyjyktk?ssl=true";
const db = pgp(connectionString);


let database = Query(db);
let waiterObject = WaitersAvailabilityFactory(database);
let waiterApp = waiterAvailabilityApp(waiterObject,database);


// Setup a simple ExpressJS server
const app = express();

//Configure the express-handlebars module:
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

// setup handlebars
app.engine('handlebars', handlebarSetup);
// set handlebars as the view engine
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//built-in static middleware
app.use(express.static('public'));

// Routes
app.get('/waiters/:username', async function (req, res) {
  let addDays = req.params.name
  let result = await database.insertUserName(addDays);
  
  res.render('selectDays', {
    result,
    addDays
  });
  
});
app.post('/waiters', async function (req, res) {

  res.render('selectDays', {
    name: req.body.name
  })
  // waiterObject.setError(nameInput);
  // waiterObject.setUserName(nameInput);
  // if (waiterObject.getError() === undefined) {
  //   await database.insertUserName(nameInput);
  // }
  // res.redirect('/waiters/:username');
  
});
app.get('/',waiterApp.pageLoad);
app.post('/',waiterApp.add); 
// Set PORT variable
let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});

