import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const image = product.image_url || product.image;

  return (
    <Link to={`/products/${product.id}`} className="fashion-product-link">
      <Card className="fashion-product-card h-100">
        {/* PRODUCT IMAGE */}
        <div className="fashion-product-image">
          {image ? (
            <Card.Img
              variant="top"
              src={image}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <div className="fashion-product-placeholder">
              <span>TV.</span>
              <small>FASHION COLLECTION</small>
            </div>
          )}

          {product.is_new && <span className="fashion-product-badge">NEW</span>}
        </div>

        {/* PRODUCT INFORMATION */}
        <Card.Body className="fashion-product-body">
          <span className="fashion-product-category">
            {product.category_name || "TV COLLECTION"}
          </span>

          <Card.Title className="fashion-product-name">
            {product.name}
          </Card.Title>

          <Card.Text className="fashion-product-price">
            {Number(product.price).toLocaleString("vi-VN")}đ
          </Card.Text>

          <div className="fashion-product-action">
            <span>Xem chi tiết</span>
            <span className="fashion-product-arrow">↗</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
