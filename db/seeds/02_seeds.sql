-- Seed data for users table
INSERT INTO users (name, email, phone_number, password)
VALUES
('John Doe', 'johndoe@example.com', '123-456-7890', 'password123'),
('Jane Doe', 'janedoe@example.com', '098-765-4321', 'password456'),
('Bob Smith', 'bobsmith@example.com', '555-555-5555', 'password789'),
('Alice Johnson', 'alicejohnson@example.com', '111-111-1111', 'password000'),
('Mark Davis', 'markdavis@example.com', '222-222-2222', 'password111'),
('Sarah Lee', 'sarahlee@example.com', '333-333-3333', 'password222'),
('Mike Johnson', 'mikejohnson@example.com', '444-444-4444', 'password333'),
('Jessica Brown', 'jessicabrown@example.com', '666-666-6666', 'password444'),
('David Lee', 'davidlee@example.com', '777-777-7777', 'password555'),
('Jennifer Davis', 'jenniferdavis@example.com', '888-888-8888', 'password666');

-- Seed data for menu_items table
INSERT INTO menu_items (name, description, price, availability, image_url)
VALUES
('Hamburger', 'A classic hamburger with lettuce, tomato, and pickles', 599, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Hamburger'),
('Cheeseburger', 'A hamburger with melted cheese', 699, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Cheeseburger'),
('Fries', 'Crispy golden fries', 299, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Fries'),
('Onion Rings', 'Crispy breaded onion rings', 399, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Onion+Rings'),
('Chicken Sandwich', 'A grilled chicken breast with lettuce and mayo', 699, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Chicken+Sandwich'),
('Fish Sandwich', 'A crispy fish fillet with lettuce and tartar sauce', 799, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Fish+Sandwich'),
('Caesar Salad', 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing', 499, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Caesar+Salad'),
('Greek Salad', 'Mixed greens, tomatoes, cucumbers, olives, feta cheese, and Greek dressing', 599, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Greek+Salad'),
('Soft Drink', 'Coca-Cola, Pepsi, or Sprite', 199, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Soft+Drink'),
('Milkshake', 'Vanilla, chocolate, or strawberry', 399, TRUE, 'https://dummyimage.com/600x400/000/fff&text=Milkshake');

-- Seed data for status table
INSERT INTO status (status)
VALUES
('Placed'),
('Accepted'),
('Preparing'),
('Ready'),
('Completed');

-- Seed data for cart_items table
INSERT INTO cart_items (item_id, user_id, quantity)
VALUES
(1, 1, 2),
(3, 1, 1),
(4, 2, 3),
(5, 3, 2),
(6, 4, 1),
(8, 4, 2),
(2, 5, 1),
(9, 6, 2),
(7, 7, 1),
(10, 8, 2);

-- orders table
INSERT INTO orders (customer_id, status, total, created_at, accepted_at, estimated_end_time, completed_at)
VALUES
(1, 1, 1597, '2022-02-20 12:34:56', NULL, NULL, NULL),
(2, 1, 2097, '2022-02-21 10:11:12', NULL, NULL, NULL),
(3, 2, 1198, '2022-02-22 14:15:16', NULL, NULL, NULL),
(4, 3, 399, '2022-02-23 16:17:18', NULL, NULL, NULL),
(5, 1, 1397, '2022-02-24 18:19:20', NULL, NULL, NULL),
(6, 2, 599, '2022-02-25 20:21:22', NULL, NULL, NULL),
(7, 3, 1399, '2022-02-26 22:23:24', NULL, NULL, NULL),
(8, 4, 899, '2022-02-27 00:00:00', NULL, NULL, NULL),
(9, 5, 499, '2022-02-28 12:00:00', NULL, NULL, NULL),
(10, 1, 1099, '2022-03-01 18:00:00', NULL, NULL, NULL);

-- order_items table
INSERT INTO order_items (order_id, menu_items_id)
VALUES
(1, 1),
(1, 5),
(1, 8),
(2, 2),
(2, 4),
(2, 6),
(2, 9),
(3, 2),
(3, 3),
(3, 7),
(4, 4),
(4, 6),
(4, 10),
(5, 1),
(5, 5),
(5, 6),
(6, 2),
(6, 7),
(6, 9),
(7, 3),
(7, 5),
(7, 10),
(8, 1),
(8, 3),
(8, 7),
(9, 2),
(9, 4),
(10, 1),
(10, 5),
(10, 6),
(10, 9);