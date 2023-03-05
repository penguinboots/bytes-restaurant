module.exports = function(router, database) {

  router.get('/menu', (req, res) => {

    const username = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }

    //! Privileged account check
    // if (username !== 'PRIV USER') {
    //   res
    //       .status(403)
    //       .send("The current user does not have access to the requested resource!");
    //       return;
    // }

    database.getFullMenu()
      .then(menu => {
        const templateVars = {
          menu
        };
        res.render("edit-menu", templateVars);
        return;
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  router.get('/orders', (req, res) => {
    const user = req.cookies["username"];

    // if (!username) {
    //   res
    //     .status(401)
    //     .send("No currently logged in user detected");
    //   return;
    // }
    //! Privileged account check
    // if (username !== 'PRIV USER') {
    //   res
    //       .status(403)
    //       .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.getOrders()
      .then(orders => {
        const templateVars = {
          orders,
          user
        };
        res.render("vendor-orders", templateVars);
        return;
      })
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
      .then(menu => {
        const templateVars = {
          menu
        };
        res.render('edit-menu', templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Change menu item (privileged access)
  router.post('/menu/:id', (req, res) => {
    const username = req.cookies["username"];

    //! Privileged account check
    // if (username !== 1) {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.updateMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => {
        templateVars = {
          menu_item
        };
        res.render('edit-menu', templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Delete menu item (privileged access)
  router.post('/menu/:id/delete', (req, res) => {
    const username = req.cookies["username"];

    //! Privileged account check
    // if (username !== 1) {
    //   res
    //     .status(403)
    //     .send("The current user does not have access to the requested resource!");
    //   return;
    // }

    database.deleteMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => {
        const templateVars = {
          menu_item
        };
        res.render('edit-menu', templateVars);
        return;
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
