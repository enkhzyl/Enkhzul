-- ============================================
-- FastFood - Онлайн Захиалгын Систем
-- Мэдээллийн сангийн бүтэц (Schema)
-- pgAdmin дээр энэ файлыг ажиллуулна уу
-- ============================================

-- Хэрэглэгчдийн хүснэгт
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone       VARCHAR(20),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Захиалгуудын хүснэгт
CREATE TABLE IF NOT EXISTS orders (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
    total_price     DECIMAL(10, 2) NOT NULL,
    total_calories  INTEGER,
    address         TEXT NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    note            TEXT,
    status          VARCHAR(20) DEFAULT 'pending'
                    CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Захиалгын бараануудын хүснэгт
CREATE TABLE IF NOT EXISTS order_items (
    id                      SERIAL PRIMARY KEY,
    order_id                INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id            VARCHAR(100) NOT NULL,
    menu_item_name          VARCHAR(200) NOT NULL,
    quantity                INTEGER NOT NULL DEFAULT 1,
    item_price              DECIMAL(10, 2) NOT NULL,
    item_calories           INTEGER,
    selected_ingredients    JSONB,
    created_at              TIMESTAMP DEFAULT NOW()
);

-- Индексүүд
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- updated_at автоматаар шинэчлэх функц
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Амжилттай үүссэн эсэхийг шалгах
-- ============================================
SELECT 'users хүснэгт үүслээ' AS message WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users');
SELECT 'orders хүснэгт үүслээ' AS message WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders');
SELECT 'order_items хүснэгт үүслээ' AS message WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'order_items');
