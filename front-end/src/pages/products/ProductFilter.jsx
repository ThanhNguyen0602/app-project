import { Row, Col, Form } from "react-bootstrap";

const ProductFilters = ({
  products ,
  category,
  priceFilter,
  sort,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) => {
  // Lấy danh mục từ danh sách sản phẩm
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Row className="g-3 mb-4">
      {/* Lọc theo danh mục */}
      <Col md={4}>
        <Form.Label>Danh mục</Form.Label>

        <Form.Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/* Lọc theo giá */}
      <Col md={4}>
        <Form.Label>Khoảng giá</Form.Label>

        <Form.Select
          value={priceFilter}
          onChange={(e) => onPriceChange(e.target.value)}
        >
          <option value="all">Tất cả mức giá</option>
          <option value="under300">Dưới 300.000đ</option>
          <option value="300to500">300.000đ - 500.000đ</option>
          <option value="over500">Trên 500.000đ</option>
        </Form.Select>
      </Col>

      {/* Sắp xếp sản phẩm */}
      <Col md={4}>
        <Form.Label>Sắp xếp</Form.Label>

        <Form.Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ProductFilters;
