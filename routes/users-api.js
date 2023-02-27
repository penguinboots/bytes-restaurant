
module.exports = function(router, database) {

  // Get all users
  router.get('/', (req, res) => {
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
  router.get('/:id', (req, res) => {
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

  return router;

}

