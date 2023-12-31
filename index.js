// Import ExpressJS framework
import express from 'express';

//Setup handlebars
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';


// Import modules
import WaiterAvailabilityAppRoutes from './routes/waiter-routes.js';
import WaitersAvailabilityFactory from './js/waiter-object.js';
import Query from './services/query.js';
import db from './routes/database-connect.js';

let query = Query(db);
let waiterObject = WaitersAvailabilityFactory(query);
let waiterApp  = WaiterAvailabilityAppRoutes(waiterObject);

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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

//built-in static middleware
app.use(express.static('public'));

// Routes
app.get('/waiters/:username', waiterApp.saveUser);

app.post('/waiters/:username', waiterApp.saveDays);

app.get('/days',waiterApp.getDays);

app.post('/days',waiterApp.showD);

app.get('/reset', waiterApp.reset); // Reset button clicked

app.get('/', waiterApp.pageLoad);
app.post('/', waiterApp.add);
// Set PORT variable
let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

