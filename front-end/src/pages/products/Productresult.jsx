import { Row, Col, Pagination } from "react-bootstrap";
import ProductCard from "../../component/ProductCard";

const ProductResults = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (products.length === 0) {
    return <p className="text-center py-5">Không tìm thấy sản phẩm phù hợp.</p>;
  }

  return (
    <>
      {/* Danh sách sản phẩm */}
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Phân trang */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </Pagination>
      )}
    </>
  );
};

export default ProductResults;
