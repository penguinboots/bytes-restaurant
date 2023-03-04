// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
// const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Temp placeholder for db
const database = require('./db');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1']
// }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const userRoutes = require('./routes/users');
const managementRoutes = require('./routes/management');
const apiRoutes = require('./routes/combined-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/user', userRouter);

const userApiRouter = express.Router();
userApiRoutes(userApiRouter, database);
app.use('/api/user', userApiRouter);

const widgetApiRouter = express.Router();
widgetApiRoutes(widgetApiRouter, database);
app.use('/api/widgets', widgetApiRouter);

const managementRouter = express.Router();
managementRoutes(managementRouter, database);
app.use('/management', managementRouter);

const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

// Note: mount other resources here, using the same pattern above

const testCart = [];

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  const user = req.cookies["userId"]

  const templateVars = {
    user
  }
  res.render('index', templateVars);
});

//TODO: to be refactored -- testing purposes only

app.get('/menu', (req, res) => {

  const user = req.cookies["userId"]

  database.getFullMenu()
    .then(menu => {
      
      const templateVars = {
        menu:menu, user:user
      };
      res.render("menu", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

});

app.get('/about', (req, res) => {

  const user = req.cookies["userId"]

  const templateVars = {
    user
  }

  res.render('about', templateVars);

});

app.post('/login/1', (req, res) => {

  res.cookie('user', 1);
  res.redirect('back');

});

app.post('/login/2', (req, res) => {

  res.cookie('user', 2);
  res.redirect('back');

});

app.post('/logout', (req, res) => {

  res.clearCookie('user');
  res.redirect('back');

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.post('/cart/add', (req, res) => {
//   const testItem = {
//     name: req.body.itemName,
//     price: req.body.itemPrice,
//     quantity: 1
//   };
//   testCart.push(testItem);
//   res.send(testCart);
// });



// app.get('/cart', (req, res) => {
//   console.log(testCart);
//   res.send(testCart);
// });

app.get('/ordering', (req, res) => {

  const user = req.cookies["userId"]

  database.getFullMenu()
    .then(menu => {

      const templateVars = {
        menu: menu, user: user
      };
      res.render("ordering", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

});

app.post('/cart/add', (req, res) => {

  database.getQuantityInCart(req.cookies["username"], req.body.itemId)
      .then(quantityArray => {

        const quantity = quantityArray[0];

        if (!quantity) {
          
          //The cookie isn't accessible here for some reason, returns 'undefined' 
          const userId = req.cookies["username"];
          const constructed_cart_item = { name: req.body.itemName, price: req.body.itemPrice, quantity };

          if (quantity === 0) {
            // Update existing zeroed cart item with 1
            // The update function is not passing in the userId in the DB for some reason
            database.updateCartItems({ userId: userId, item_id: req.body.itemId, }, 1);
            ++constructed_cart_item.quantity;
            res.send(constructed_cart_item);
            return;
          }

          // Pass into database to create new cart item (initial add)
          database.createCartItem({ item_id: req.body.itemId, userId: userId, quantity: 1 });
          constructed_cart_item.quantity = 1;
          res.send(constructed_cart_item);
          return;
        }

        // Increment the cart
        database.updateCartItems({ userId: userId, item_id: req.body.itemId, }, ++quantity);
        ++constructed_cart_item.quantity;
        res.send(constructed_cart_item);
        return;
      });
});

app.get('/cart', (req, res) => {

  database.getCartItemsbyUserID(req.cookies["username"])
      .then(cart => res.send(cart))
      .catch(e => {
        console.error(e, "I messed up here!");
        res.send(e);
      });

});

