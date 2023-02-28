
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
    const username = req.cookies["username"];

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

  // Order form
  router.get('/ordering', (req, res) => {
    const username = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    const templateVars = {
      username,
    };

    res.render('ordering', templateVars);

  });

  // Get user orders
  router.post('/orders', (req, res) => {
    const username = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    database.getAllUserOrders(username)
      .then(order => res.send(order))
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  // Create an order
  router.post('/orders', (req, res) => {
    const username = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    database.addOrder({ ...req.body })
      .then(order => res.send(order))
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  return router;

};
