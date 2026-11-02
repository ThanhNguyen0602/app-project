import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Badge,
  Spinner,
  Alert,
  Tabs,
  Tab,
  Breadcrumb,
} from "react-bootstrap";
import "../../styles/ProductDetails.css";





const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 1. Lấy dữ liệu từ Backend
  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const res = await axiosClient.get(`products/${id}`);

        if (!active) return;

        const data = res.data.data;

        setProduct(data);
        setSelectedImage(data.images?.[0]?.image_url || "");
        setSelectedColor("");
        setSelectedSize("");
        setQuantity(1);
      } catch (err) {
        if (active) {
          setError(
            err.response?.status === 404
              ? "Không tìm thấy sản phẩm."
              : "Không thể tải thông tin sản phẩm.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Đang tải sản phẩm...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!product) return null;

  const variants = product.variants || [];
  const images = product.images || [];

  // 2. Lấy danh sách màu không trùng nhau
  const colors = [...new Set(variants.map((item) => item.color))];

  // 3. Chỉ lấy size thuộc màu đã chọn
  const sizes = [
    ...new Set(
      variants
        .filter((item) => item.color === selectedColor)
        .map((item) => item.size),
    ),
  ];

  // 4. Tìm biến thể chính xác
  const selectedVariant = variants.find(
    (item) => item.color === selectedColor && item.size === selectedSize,
  );

  const stock = Number(selectedVariant?.stock ?? 0);

  const totalStock = variants.reduce(
    (total, item) => total + Number(item.stock),
    0,
  );

  // 5. Tính giá bán
  const basePrice = Number(product.sale_price ?? product.price);

  const adjustment = Number(selectedVariant?.price_adjustment ?? 0);

  const finalPrice = basePrice + adjustment;

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN") + "đ";

  // 6. Chọn màu
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
    setQuantity(1);
  };

  // 7. Chọn size
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  // 8. Thêm giỏ hàng (chưa kết nối API)
  const handleAddToCart = () => {
    if (!selectedVariant || stock <= 0) return;

    const cartItem = {
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity,
    };

    console.log("Add to cart:", cartItem);
  };

  return (
    <Container className="product-details-page py-4">
      {/* BREADCRUMB */}
      <Breadcrumb className="product-breadcrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Trang chủ
        </Breadcrumb.Item>

        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
          Sản phẩm
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 g-lg-5">
        {/* CỘT TRÁI - HÌNH ẢNH */}
        <Col lg={6}>
          <div className="product-main-image">
            {selectedImage ? (
              <img src={selectedImage} alt={product.name} />
            ) : (
              <div className="product-no-image">Chưa có hình ảnh</div>
            )}
          </div>

          <div className="product-thumbnails">
            {images.map((image) => (
              <button
                type="button"
                key={image.id}
                className={
                  selectedImage === image.image_url
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() => setSelectedImage(image.image_url)}
              >
                <img src={image.image_url} alt={product.name} />
              </button>
            ))}
          </div>
        </Col>

        {/* CỘT PHẢI - THÔNG TIN */}
        <Col lg={6}>
          <div className="product-info">
            <p className="product-category">{product.category_name}</p>

            <h1 className="product-title">{product.name}</h1>

            <p className="product-sku">Mã sản phẩm: {product.sku}</p>

            <div className="product-stock-status">
              <Badge bg={totalStock > 0 ? "success" : "secondary"}>
                {totalStock > 0 ? "Còn hàng" : "Hết hàng"}
              </Badge>
            </div>

            {/* GIÁ */}
            <div className="product-price">
              <span className="current-price">{formatPrice(finalPrice)}</span>

              {product.sale_price != null && (
                <span className="old-price">
                  {formatPrice(Number(product.price) + adjustment)}
                </span>
              )}
            </div>

            <p className="product-short-description">{product.description}</p>

            {/* CHỌN MÀU */}
            <div className="product-option">
              <h6>
                Màu sắc:
                <span> {selectedColor || "Chưa chọn"}</span>
              </h6>

              <div className="option-buttons">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "dark" : "outline-dark"}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* CHỌN SIZE */}
            <div className="product-option">
              <h6>
                Kích thước:
                <span> {selectedSize || "Chưa chọn"}</span>
              </h6>

              <div className="option-buttons">
                {sizes.map((size) => {
                  const variant = variants.find(
                    (item) =>
                      item.color === selectedColor && item.size === size,
                  );

                  return (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "dark" : "outline-dark"}
                      disabled={!variant || Number(variant.stock) === 0}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* TỒN KHO */}
            {selectedVariant && (
              <p className="variant-stock">
                {stock > 0
                  ? `Còn ${stock} sản phẩm`
                  : "Biến thể này đã hết hàng"}
              </p>
            )}

            {/* SỐ LƯỢNG */}
            <div className="product-option">
              <h6>Số lượng</h6>

              <div className="quantity-control">
                <Button
                  variant="outline-dark"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </Button>

                <Form.Control
                  type="number"
                  min={1}
                  max={Math.max(1, stock)}
                  value={quantity}
                  disabled={!selectedVariant || stock === 0}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    setQuantity(Math.max(1, Math.min(stock || 1, value || 1)));
                  }}
                />

                <Button
                  variant="outline-dark"
                  disabled={!selectedVariant || quantity >= stock}
                  onClick={() =>
                    setQuantity((prev) => Math.min(stock, prev + 1))
                  }
                >
                  +
                </Button>
              </div>
            </div>

            {/* NÚT GIỎ HÀNG */}
            <Button
              variant="dark"
              className="add-to-cart-btn"
              disabled={!selectedVariant || stock <= 0}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>

            <div className="product-extra-info">
              <p>✓ Kiểm tra hàng trước khi nhận</p>
              <p>✓ Hỗ trợ tư vấn chọn size</p>
              <p>✓ Mua sắm tại TV STUDIO</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* THÔNG TIN CHI TIẾT */}
      <div className="product-description-section">
        <Tabs defaultActiveKey="description" className="product-tabs mb-4">
          <Tab eventKey="description" title="Mô tả sản phẩm">
            <h5>{product.name}</h5>
            <p>{product.description}</p>
          </Tab>

          <Tab eventKey="material" title="Thông tin sản phẩm">
            <p>
              <strong>Danh mục:</strong> {product.category_name}
            </p>
            <p>
              <strong>Chất liệu:</strong> {product.material || "Đang cập nhật"}
            </p>
            <p>
              <strong>Mã sản phẩm:</strong> {product.sku}
            </p>
          </Tab>

          <Tab eventKey="care" title="Hướng dẫn bảo quản">
            <p>{product.care_instructions || "Đang cập nhật"}</p>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default ProductDetails;
