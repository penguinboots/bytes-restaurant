INSERT INTO users (name, email, phone_number, password)
VALUES ('Devin Sanders', 'tristanjacobs@gmail.com', '205-123-4567', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Iva Harrison', 'allisonjackson@mail.com', '647-123-4567', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO menu_items ( name, description, price, image_url)
VALUES ('Espresso', 'Espresso is a concentrated form of coffee brewed with high pressure, hot water and finely ground coffee beans.', 3, 'https://www.hsph.harvard.edu/wp-content/uploads/sites/30/2019/02/caffeine-close-up-coffee-539432-1200x800.jpg'),
('Cappuccino', 'Cappuccino is prepared with equal parts double espresso, steamed milk, and steamed milk foam.', 4, 'https://www.hsph.harvard.edu/wp-content/uploads/sites/30/2019/02/caffeine-close-up-coffee-539432-1200x800.jpg');

INSERT INTO status (status) VALUES ('Pending'), ('Accepted'), ('Rejected'), ('Completed');
