module.exports = function(router, database) {

  router.get('/', (req, res) => {

    const user = req.cookies["userId"];
  
    const templateVars = {
      user
    };
    res.render('index', templateVars);
  });
  
  router.get('/menu', (req, res) => {
  
    const user = req.cookies["userId"];
  
    database.getFullMenu()
      .then(menu => {
  
        const templateVars = {
          menu: menu, user: user
        };
        res.render("menu", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  
  });

  router.get('/about', (req, res) => {

    const user = req.cookies["userId"];
  
    const templateVars = {
      user
    };
  
    res.render('about', templateVars);
  
  });
  
  router.post('/login/1', (req, res) => {
  
    res.cookie('userId', 1);
    res.redirect('/');
  
  });
  
  router.post('/login/2', (req, res) => {
  
    res.cookie('userId', 2);
    res.redirect('/');
  
  });
  
  router.post('/logout', (req, res) => {
  
    res.clearCookie('userId');
    res.redirect('/');
  
  });

  return router;
};
