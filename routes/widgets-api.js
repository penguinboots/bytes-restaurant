
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// const { MessagingResponse } = require('twilio').twiml;

module.exports = function(router, database) {

  // Full menu retrieval
  router.get('/menu', (req, res) => {
    database.getFullMenu(req.query)
      .then(menu => res.send(menu))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Specific menu item retrieval
  router.get('/menu/:id', (req, res) => {
    database.getMenuItem(req.params.id)
      .then(menu_item => res.send(menu_item))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Change menu (privileged access)
  router.post('/menu', (req, res) => {
    const username = req.cookies["username"];

    //! Privileged account check
    // if (username !== 'PLACEHOLDER FOR privileged ACC') {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    // }

    database.updateMenu({ ...req.body })
      .then(menu => res.send(menu))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Change menu item (privileged access)
  router.post('/menu/:id', (req, res) => {
    const username = req.cookies["username"];

    //! Privileged account check
    // if (username !== 'PLACEHOLDER FOR PRIVILEGED ACC') {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.updateMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => res.send(menu_item))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Delete menu item (privileged access)
  router.post('/menu/:id/delete', (req, res) => {
    const username = req.cookies["username"];

    //! Privileged account check
    // if (username !== 'PLACEHOLDER FOR PRIVILEGED ACC') {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.deleteMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => res.send(menu_item))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Get all orders
  router.get('/orders', (req, res) => {
    const username = req.cookies["username"];

    if (!username) {
      res
        .status(401)
        .send("No currently logged in user detected");
      return;
    }

    //! Privileged account check
    // if (username === 'PLACEHOLDER FOR PRIVILEGED ACC') {

    //   database.getAllOrders()
    //     .then(orders => res.send(orders))
    //     .catch(e => {
    //       console.error(e);
    //       res.send(e);
    //     });
    // }

    database.getAllUserOrders(username)()
      .then(orders => res.send(orders))
      .catch(e => {
        console.error(e);
        res.send(e);
      });

    // Creating orders
    router.post('/orders', (req, res) => {
      const username = req.cookies["username"];

      // if (!username) {
      //   res
      //     .status(401)
      //     .send("No currently logged in user detected");
      //   return;
      // }

      database.addOrder({ ...req.body, customer_id: username })
        .then(order => {
          res.send(order);
        }
        );
    })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Update specific orders (rejection purposes -- privileged access)
  router.post('/orders/:id', (req, res) => {
    const username = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    //! Privileged account check
    // if (username !== 'PLACEHOLDER FOR PRIVILEGED ACC') {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.rejectOrder(req.params.id)
      .then(order => res.send(order))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};