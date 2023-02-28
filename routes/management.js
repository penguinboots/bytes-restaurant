module.exports = function(router, database) {

  router.get('/menu', (req, res) => {

    const userId = req.session.userId;

    if (!userId) {
      res
        .status(401)
        .send("No currently logged in user detected");
      return;
    }
  
    //! Privileged account check
    if (userId === 1) {
  
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
    }

    res
        .status(403)
        .send("The current user does not have access to the requested resource!");
  
  });
  
  router.get('/orders', (req, res) => {
    const userId = req.session.userId;
  
    if (!userId) {
      res
        .status(401)
        .send("No currently logged in user detected");
      return;
    }
  
    //! Privileged account check
    if (userId === 1) {
  
      database.getAllOrders()
        .then(orders => {
          const templateVars = {
            orders
          };
          res.render("orders", templateVars);
          return;
        })
        .catch(e => {
          console.error(e);
          res.send(e);
        });
    }

    res
        .status(403)
        .send("The current user does not have access to the requested resource!");
  
  });

  // Change menu (privileged access)
  router.post('/menu', (req, res) => {
    const userId = req.session.userId;

    //! Privileged account check
    if (userId !== 'PLACEHOLDER FOR privileged ACC') {
      res
        .status(403)
        .send("The current user does not have access to the requested resource!");
    }

    database.updateMenu({ ...req.body })
      .then(menu => {
        const templateVars = {
          menu
        }
        res.render('edit-menu', templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Change menu item (privileged access)
  router.post('/menu/:id', (req, res) => {
    const userId = req.session.userId;

    //! Privileged account check
    if (userId !== 1) {
      res
        .status(403)
        .send("The current user does not have access to the requested resource!");
      return;
    }

    database.updateMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => {
        templateVars = {
          menu_item
        }
        res.render('edit-menu', templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // Delete menu item (privileged access)
  router.post('/menu/:id/delete', (req, res) => {
    const userId = req.session.userId;

    //! Privileged account check
    if (userId !== 1) {
      res
        .status(403)
        .send("The current user does not have access to the requested resource!");
      return;
    }

    database.deleteMenuItem({ ...req.body, menu_item_id: req.params.id })
      .then(menu_item => {
        const templateVars = {
          menu_item
        }
        res.render('edit-menu', templateVars);
        return;
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
}