
const bcrypt = require('bcrypt');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
      .then(user => {

        //TODO: revisit handling this error
        if (!user) {
          res
            .status(500)
            .send("User creation unsuccessful");
          return;
        }
        // // req.session.username = user.id;

        res.send("User successfully created!");
      })
      .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login = function(email, password) {
    return database.getUserWithEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };
  exports.login = login;

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .send("User doesn't exist!");
          return;
        }
        // req.session.username = user.id;
        res.cookie('username', user.id);

        res.send({ user: { name: user.name, email: user.email, id: user.id } });
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    // req.session.username = null;
    res.clearCookie('username');
    res.send({});
  });

  // Get all orders
  router.get('/:id/orders', (req, res) => {
    const username = req.cookies["userId"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    database.getAllUserOrders(username)()
      .then(orders => {
        const templateVars = {
          orders: orders,
          username: username
        };
        res.render('user-orders', templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  //Order form
  router.get('/ordering', (req, res) => {

    const user = req.cookies["userId"];

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

  // Create an order
  router.post('/orders', async (req, res) => {

    const userId = req.cookies["userId"];

    try {

      let cart = await database.getCartItemsbyUserID(userId);

      //* Calculating cart total (see if val can be passed from FE)
      const total = cart.reduce((accumulator, val) => accumulator + (val["price"] * val["quantity"]), 0);

      //* Create an order, retrieving it's order id (order pending status)
      const order = await database.createOrder({ customer_id: userId, status: 1, total: total });

      //* Filter zero quantity items in cart
      let filtered_cart = cart.filter(cart_item => cart_item.quantity > 0);
    
      //TODO: Twilio integration here

      //* Using the order id, insert the cart items into order_items
      //! placeholder query, actual name/implementation may vary
      await database.createOrderItems({ order_id: order["id"], cart: filtered_cart });

      //* Purge the cart
      const promises = cart.map(cart_item => {
        return database.updateCartItems({ user_id: userId, item_id: cart_item.item_id }, { quantity: 0 });
      });

      await Promise.all(promises);
      res.status(200).redirect(`/user/orders/${order.id}`);

    } catch (err) {

      console.error(err);
      res.status(500);

    }

  });

  // Get user orders
  router.get('/orders', (req, res) => {
    const user = req.cookies["userId"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    database.getOrdersbyCustomerId(user)
      .then(orders => {
        const templateVars = {
          user, orders
        };
        res.render("user-orders", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  // Get specifc user order
  router.get('/orders/:id', async (req, res) => {
    const user = req.cookies["userId"];

    try {

      //!placeholder queries for db

      const templateVars = {
        user,
        order: await database.getOrderById(req.params.id),
        orderItems: await database.getOrderItemsByOrderId(req.params.id),
      };

      const dateString = templateVars.order.created_at;
      const dateObject = new Date(dateString);
      templateVars.order.created_at = dateObject;

      res.render("user-order-view", templateVars);

    } catch (err) {
      console.error(err);
      res.status(500);
    }


  });

  // Adding to cart
  router.post('/cart', (req, res) => {
    database.addToCart(req.cookies["userId"])
      .then(cart => res.send(cart))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // // Purging cart
  // router.post('/cart/delete', (req, res) => {
  //   database.deleteCart(req.cookies["userId"])
  //     .then(cart => res.send(cart))
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e);
  //     });

  // });

  return router;

};
