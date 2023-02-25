## Pick a Project
  * food pick-up ordering

## User Stories

  * As a customer
    * I want to order food for pickup because I'm hungry.
    * I want to be able to add items to cart because I want to review them before checkout.
    * I want to be able to see my subtotal in cart before checkout
  * As a vendor
    * I want to be able to see the number and order of active takeout orders in order to prioritize operations.
    * I want to be able to update my menu items and pricing
    * I want to be able to update hours and availability
    * I want to be able to accept or reject orders
    * I want to be able to set an estimated pickup time on accepting an order

  * As a customer
    * I shouldn't be able to modify menu items or prices
    * I shouldn't be able to cancel orders after they've been accepted
  * As a vendor
    * I shouldn't be able to change orders after they've been accepted

## User Scenarios

  * Given that I am logged in as a customer
    * when I click add to cart on a menu item, it is added to my cart

  * Given that I am logged in as a vendor
    * when I add or remove a menu item, it is reflected in the item availabity to the customer

## ERD

  * user
      * customer or vendor
    - username
    - password
    - name
    - phone number

  * menu_items
    - name
    - description
    - price
    - availability
    - image url

  * cart_items
    - FK item_id
    - FK user_id
    - quantity

  * orders
    - FK customer_id
    - FK order_items
    - total
    - created_at
    - FK status
    - accepted_at
    - estimated_end_time
    - completed_at

  * status
    - status (pending, accepted, rejected, complete)

  * order_items
    - FK order_id
    - FK menu_items_id
  

## Routes

- Users
  * GET   /users
  * GET   /users/:id

- Menu Items
  * GET   /menu
  * GET   /menu/:id
  * POST  /menu/:id
  * POST  /menu
  * POST  /menu/:id/delete

- Cart Items **
  * GET   /cart
  * POST  /cart
  * POST  /cart/:id/delete

- Orders
  * GET   /orders
  * GET   /orders/:id
  * POST  /orders/:id
  * POST  /orders

## MVP/MVD

### MVP
- Landing page (same for all users)
- Login buttons (as vendor, as customer)
- Cart (items, subtotal, submit order)
- Order gets sent to restaurant for approval/denial
  - Text notification to vendor
  - Text notification to customer on approval/denial
    - Approval includes estimated pick-up time
- Customer should be able to view own active orders
- Vendor should be able to view all active orders

### MVD
- Login as customer
  - Add items to cart
  - View cart, subtotal
  - Submit order                    -- view change on vendor end
  - Receive SMS feedback
  
  - View own orders

- Login as vendor
  - Modify menu items/availability  -- view change on customer end

  - View active orders
  - Receive SMS notifications
  - Respond to orders

  - View all orders (active, inactive)

  