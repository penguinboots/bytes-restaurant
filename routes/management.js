const notifications = require('./notifications');
const { MessagingResponse } = require('twilio').twiml;

module.exports = function(router, database) {

  router.get('/menu', (req, res) => {

    const username = req.cookies["userId"];

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
    const user = req.cookies["userId"];

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

  // Render specific order page
  router.get('/orders/:id', async (req, res) => {
    const user = req.cookies["userId"];

    try {

      const templateVars = {
        user,
        order: await database.getOrderById(req.params.id),
        orderItems: await database.getOrderItemsByOrderId(req.params.id),
      };

      // Formatting timestamps appropriately
      const formatDate = (dateString) => dateString ? new Date(dateString) : null;

      templateVars.order.created_at = formatDate(templateVars.order?.created_at);
      templateVars.order.completed_at = formatDate(templateVars.order?.completed_at);
      templateVars.order.estimated_end_time = formatDate(templateVars.order?.estimated_end_time);
      templateVars.order.accepted_at = formatDate(templateVars.order?.accepted_at);

      res.render("vendor-order-view", templateVars);

    } catch (err) {
      console.error(err);
      res.status(500);
    }

  });

  // Process a submitted order via sms to either accept or reject it
  router.post('/orders/process/sms', async (req, res) => {

    const twiml = new MessagingResponse();

    try {

      //* Obtaining the desired action from vendor
      let receivedText = req.body.Body;

      const vendorOrderResponseArray = receivedText.split("E");

      if (vendorOrderResponseArray.length !== 2) {
        throw new Error('improperly formatted text please use the fromat: `<ordernumber>E<time in minutes>`');
      }

      const vendorOrderResponse = { orderId: Number(vendorOrderResponseArray[0]), estimatedTime: `${vendorOrderResponseArray[1]} minutes` };

      if (Number(vendorOrderResponse.estimatedTime.split(" ")[0]) !== 0) {

        //* Acceptance route
        twiml.message(`Order #${String(vendorOrderResponse.orderId).padStart(4, '0')}  has been accepted, with completion time: ${vendorOrderResponse.estimatedTime}`);
        await database.acceptOrder(vendorOrderResponse.orderId, vendorOrderResponse.estimatedTime);
        res.status(200).type('text/xml').send(twiml.toString());
      
        let acceptanceMessage = `Hello 🤖! Thanks for ordering from Bytes! Order #${String(vendorOrderResponse.orderId).padStart(4, '0')} is now being prepared. Your estimated pickup time is in ${vendorOrderResponse.estimatedTime}.`;
        await notifications(null, acceptanceMessage);

        return;

      }

      //* Rejection route
      twiml.message(`Order #${String(vendorOrderResponse.orderId).padStart(4, '0')} has been rejected`);

      await database.rejectOrder(vendorOrderResponse.orderId);

      let rejectionMessage = `Hello 🤖! Order #${String(vendorOrderResponse.orderId).padStart(4, '0')} was rejected. Please contact the restaurant at xxx-xxx-xxx for further information.`;
      await notifications(null, rejectionMessage);

      res.status(200).type('text/xml').send(twiml.toString());

      return;

    } catch (err) {
      console.error(err);
      notifications(null, `${err}`);
    }

  });


  // Accept an order, setting the pick-up time
  router.post('/orders/:id/accept', async (req, res) => {

    try {

      const orderId = req.params.id;
      const estimatedTime = `${req.body["est-time"]} minutes`;

      await database.acceptOrder(orderId, estimatedTime);

      // get order and user details to send to twillio
      const order = await database.getOrderById(req.params.id);
      const users = await database.getUser(order.customer_id);
      const message = `Hello 🤖! Thanks for ordering from Bytes! Order #${String(order.id).padStart(4, '0')} is now being prepared. Your estimated pickup time is in ${estimatedTime}.`;

      notifications(users[0], message);

      res.status(200).redirect('back');

    } catch (err) {
      console.error(err);
      res.status(500);
    }

  });


  // Reject an order
  router.post('/orders/:id/reject', async (req, res) => {

    try {

      const orderId = req.params.id;
      await database.rejectOrder(orderId);

      // twillio
      const order = await database.getOrderById(orderId);
      const users = await database.getUser(order.customer_id);
      const message = `Hello 🤖! Order #${String(order.id).padStart(4, '0')} was rejected. Please contact the restaurant at xxx-xxx-xxx for further information.`;

      notifications(users[0], message);
      res.status(200).redirect('back');

    } catch (err) {
      console.error(err);
      res.status(500);
    }

  });

  // Mark an order as complete, notify guest
  router.post('/orders/:id/complete', async (req, res) => {

    try {

      const orderId = req.params.id;

      await database.completeOrder(orderId);

      //TODO: Twilio client notification
      // twillio
      const order = await database.getOrderById(orderId);
      const users = await database.getUser(order.customer_id);
      const message = `Hello 🤖! Order #${String(order.id).padStart(4, '0')} is ready for pickup.`;

      notifications(users[0], message);

      res.status(200).redirect('back');

    } catch (err) {
      console.error(err);
      res.status(500);
    }

  });

  // Change menu (privileged access)
  router.post('/menu', (req, res) => {
    const user = req.cookies["userId"];

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
    const user = req.cookies["userId"];

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
    const user = req.cookies["userId"];

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
