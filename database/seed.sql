-- ============================================
-- FastFood - Туршилтын өгөгдөл
-- Schema.sql-ийг эхлээд ажиллуулна уу!
-- ============================================

-- Туршилтын хэрэглэгч нэмэх
-- Нууц үг: demo123 (bcrypt hash)
INSERT INTO users (name, email, password_hash, phone)
VALUES 
    ('Демо Хэрэглэгч', 'demo@test.mn', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh.i', '8888-0000'),
    ('Болд Баатар', 'bold@test.mn', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh.i', '9911-2233')
ON CONFLICT (email) DO NOTHING;

-- Туршилтын захиалга нэмэх
INSERT INTO orders (user_id, total_price, total_calories, address, phone, status)
VALUES 
    (1, 15500, 850, 'Сүхбаатар дүүрэг, 3-р хороо, 45-р байр', '8888-0000', 'delivered'),
    (1, 9000, 520, 'Баянзүрх дүүрэг, 12-р хороо', '8888-0000', 'preparing')
ON CONFLICT DO NOTHING;

-- Туршилтын захиалгын бараа
INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, item_price, item_calories, selected_ingredients)
VALUES 
    (1, 'burger-classic', 'Классик Бургер', 2, 12000, 800, 
     '[{"groupId":"bread","groupName":"Талхны төрөл","options":[{"id":"white","name":"Цагаан талх","price":0,"calories":280}]},{"groupId":"meat","groupName":"Мах","options":[{"id":"beef","name":"Үхрийн мах","price":3000,"calories":350}]}]'),
    (1, 'drink-cola', 'Кока Кола', 1, 1000, 140, '[]'),
    (2, 'burrito-classic', 'Бурритто', 1, 9000, 520, '[]')
ON CONFLICT DO NOTHING;

-- ============================================
-- Хүснэгтүүдийн өгөгдлийг шалгах
-- ============================================
SELECT 'Хэрэглэгчид: ' || COUNT(*) FROM users;
SELECT 'Захиалгууд: ' || COUNT(*) FROM orders;
SELECT 'Захиалгын барааны тоо: ' || COUNT(*) FROM order_items;
