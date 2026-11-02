-- Import file này bằng phpMyAdmin (XAMPP) -> tab Import
CREATE DATABASE IF NOT EXISTS tv_studio
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tv_studio;

DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NULL,
  sku VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  material VARCHAR(255),
  care_instructions TEXT,
  price DECIMAL(12,0) NOT NULL,
  sale_price DECIMAL(12,0) NULL,
  image_url VARCHAR(500),
  is_new TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_variants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  color VARCHAR(50) NOT NULL,
  size VARCHAR(20) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  price_adjustment DECIMAL(12,0) NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO categories (id, name, slug) VALUES
  (1, 'Áo thun', 'ao-thun'),
  (2, 'Quần jeans', 'quan-jeans'),
  (3, 'Áo khoác', 'ao-khoac');

INSERT INTO products (id, category_id, sku, name, description, material, care_instructions, price, sale_price, image_url, is_new) VALUES
  (1, 1, 'TV-AT-001', 'Áo thun nam basic', 'Áo thun form rộng, thoải mái mỗi ngày.', 'Cotton 100%', 'Giặt máy ở nhiệt độ thường, không dùng chất tẩy mạnh.', 199000, NULL, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', 1),
  (2, 2, 'TV-QJ-001', 'Quần jeans slim fit', 'Quần jeans ôm vừa, năng động và cá tính.', 'Denim co giãn', 'Lộn trái khi giặt, phơi nơi thoáng mát.', 350000, 320000, 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80', 1),
  (3, 3, 'TV-AK-001', 'Áo khoác bomber', 'Áo khoác bomber hoàn thiện phong cách.', 'Polyester', 'Giặt tay hoặc giặt nhẹ, không sấy.', 499000, NULL, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', 0),
  (4, 1, 'TV-AT-002', 'Áo thun oversize', 'Áo thun oversize phong cách đường phố.', 'Cotton compact', 'Giặt ở nhiệt độ thường.', 259000, NULL, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80', 0);

INSERT INTO product_images (product_id, image_url) VALUES
  (1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'),
  (2, 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'),
  (3, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'),
  (4, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80');

INSERT INTO product_variants (product_id, color, size, stock, price_adjustment) VALUES
  (1, 'Trắng', 'M', 20, 0), (1, 'Trắng', 'L', 15, 0), (1, 'Đen', 'M', 10, 0), (1, 'Đen', 'L', 0, 0),
  (2, 'Xanh đậm', '30', 12, 0), (2, 'Xanh đậm', '32', 8, 0), (2, 'Đen', '30', 5, 10000),
  (3, 'Đen', 'M', 7, 0), (3, 'Đen', 'L', 4, 0),
  (4, 'Be', 'M', 9, 0), (4, 'Be', 'L', 6, 0);
