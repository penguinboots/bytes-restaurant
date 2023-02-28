
module.exports = function(router, database) {

  // Get all users
  router.get('/users', (req, res) => {
    database.getUsers()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res
          .status(500)
          .send("User retrieval unsuccessful");
      });
  });

  // Get specific users
  router.get('users/:id', (req, res) => {
    database.getUsers(req.params.id)
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        res
          .status(500)
          .send("User retrieval unsuccessful");
      });
  });

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

  return router;

}

