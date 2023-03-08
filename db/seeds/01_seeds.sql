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
('Pending'),
('In Progress'),
('Completed'),
('Rejected');

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
(3, 1, 1198, '2022-02-22 14:15:16', NULL, NULL, NULL),
(3, 1, 1198, '2022-02-23 14:15:16', NULL, NULL, NULL),

(3, 2, 1198, '2022-02-22 14:15:16', '2022-02-22 14:17:16', '2022-02-22 14:20:16', NULL),
(4, 3, 1198, '2022-02-23 14:15:16', '2022-02-23 14:16:16', '2022-02-23 14:20:16', '2022-02-23 14:20:16'),
(3, 3, 1198, '2022-02-24 14:15:16', '2022-02-24 14:16:16', '2022-02-24 14:20:16', '2022-02-24 14:20:16'),
(3, 3, 1198, '2022-01-24 14:15:16', '2022-01-24 14:16:16', '2022-01-24 14:20:16', '2022-01-24 14:20:16'),
(4, 3, 1198, '2022-01-24 14:15:16', '2022-01-24 14:16:16', '2022-01-24 14:20:16', '2022-01-24 14:20:16'),
(5, 3, 1198, '2022-01-24 14:15:16', '2022-01-24 14:16:16', '2022-01-24 14:20:16', '2022-01-24 14:20:16'),
(6, 3, 1198, '2022-01-24 14:15:16', '2022-01-24 14:16:16', '2022-01-24 14:20:16', '2022-01-24 14:20:16'),
(7, 3, 1198, '2022-01-24 14:15:16', '2022-01-24 14:16:16', '2022-01-24 14:20:16', '2022-01-24 14:20:16'),
(5, 3, 1198, '2022-02-24 20:15:16', '2022-02-24 20:15:16', '2022-02-24 20:20:16', '2022-02-24 20:20:16'),
(7, 3, 1198, '2022-02-26 14:15:16', '2022-02-26 14:15:16', '2022-02-26 14:20:16', '2022-02-26 14:20:16'),
(8, 3, 1198, '2022-02-27 14:15:16', '2022-02-27 14:15:16', '2022-02-27 14:20:16', '2022-02-27 14:20:16'),
(9, 4, 1198, '2022-02-28 14:15:16', NULL, NULL, NULL),
(4, 3, 399, '2022-02-23 16:17:18', '2022-02-23 16:17:18', '2022-02-23 16:27:18', '2022-02-23 16:17:18'),
(5, 1, 1397, '2022-02-24 18:19:20', NULL, NULL, NULL),
(6, 2, 599, '2022-02-25 20:21:22', '2022-02-25 20:21:22', NULL, NULL),
(7, 3, 1399, '2022-02-26 22:23:24', '2022-02-26 22:23:24', '2022-02-26 22:33:24', '2022-02-26 23:33:24'),
(8, 4, 899, '2022-02-27 00:00:00', NULL, NULL, NULL),
(9, 3, 499, '2022-02-28 12:00:00', '2022-02-28 14:15:16', '2022-02-28 14:20:16', '2022-02-28 14:20:16'),
(10, 1, 1099, '2022-03-01 18:00:00', NULL, NULL, NULL);

-- order_items table
INSERT INTO order_items (order_id, menu_items_id, quantity)
VALUES
(1, 1, 9),
(1, 5, 4),
(1, 8, 7),
(2, 2, 2),
(2, 4, 8),
(2, 6, 3),
(2, 9, 5),
(3, 2, 6),
(3, 3, 1),
(3, 7, 10),
(4, 4, 9),
(4, 6, 7),
(4, 10, 2),
(5, 1, 3),
(5, 5, 6),
(5, 6, 4),
(6, 2, 10),
(6, 7, 8),
(6, 9, 1),
(7, 3, 7),
(7, 5, 2),
(7, 10, 4),
(8, 1, 6),
(8, 3, 8),
(8, 7, 5),
(9, 2, 3),
(9, 4, 10),
(10, 1, 5),
(10, 5, 2),
(10, 6, 9),
(10, 9, 1);

-- Add random order_items to rows in the orders table that have no associated order_items
INSERT INTO order_items (order_id, menu_items_id, quantity)
SELECT o.id, m.id, FLOOR(RANDOM() * 5) + 1
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
CROSS JOIN menu_items m
WHERE oi.order_id IS NULL AND o.id <= 23;
