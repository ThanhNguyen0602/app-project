import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../component/ProductCard";


const HomePage = () => {
  // Danh mục sản phẩm
  const categories = [
    {
      id: 1,
      name: "Áo thun",
      slug: "ao-thun",
      description: "Thoải mái mỗi ngày",
    },
    {
      id: 2,
      name: "Quần jeans",
      slug: "quan-jeans",
      description: "Năng động và cá tính",
    },
    {
      id: 3,
      name: "Áo khoác",
      slug: "ao-khoac",
      description: "Hoàn thiện phong cách",
    },
  ];

  // Dữ liệu mẫu - sau này thay bằng API
  const products = [
    { id: 1, name: "Áo thun nam", price: 199000 },
    { id: 2, name: "Quần jeans", price: 350000 },
    { id: 3, name: "Áo khoác", price: 499000 },
  ];

  return (
    <div className="fashion-home">
      {/* HERO BANNER */}
      <section className="fh-hero">
        <div className="fh-hero-content">
          <span className="fh-eyebrow">TV FASHION / COLLECTION 2026</span>

          <h1>
            DEFINE YOUR
            <span> OWN STYLE.</span>
          </h1>

          <p>
            Khám phá bộ sưu tập thời trang hiện đại. Đơn giản, tinh tế và đầy cá
            tính.
          </p>

          <div className="fh-hero-actions">
            <Link to="/products" className="fh-primary-btn">
              Khám phá ngay <span>↗</span>
            </Link>

            <a href="#categories" className="fh-text-btn">
              Xem danh mục →
            </a>
          </div>
        </div>

        <div className="fh-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85"
            alt="Bộ sưu tập thời trang TV"
          />

          <div className="fh-image-label">NEW SEASON — 2026</div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="fh-section" id="categories">
        <div className="fh-section-heading">
          <div>
            <span className="fh-eyebrow">SHOP BY CATEGORY</span>
            <h2>Khám phá danh mục</h2>
          </div>
        </div>

        <Row className="g-3">
          {categories.map((category, index) => (
            <Col key={category.id} xs={12} md={4}>
              <Link
                to={`/products?category=${category.slug}`}
                className="fh-category-card"
              >
                <span className="fh-category-number">0{index + 1}</span>

                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>

                <span className="fh-category-arrow">↗</span>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="fh-section fh-products">
        <div className="fh-section-heading">
          <div>
            <span className="fh-eyebrow">SELECTED FOR YOU</span>
            <h2>Sản phẩm nổi bật</h2>
          </div>

          <Link to="/products" className="fh-view-all">
            Xem tất cả <span>→</span>
          </Link>
        </div>

        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={6} md={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>

      {/* COLLECTION BANNER */}
      <section className="fh-bottom-banner">
        <span>TV FASHION</span>
        <h2>STYLE IS AN ATTITUDE.</h2>
        <p>Tìm kiếm những thiết kế phù hợp với phong cách của bạn.</p>

        <Link to="/products" className="fh-primary-btn">
          Mua sắm ngay ↗
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
