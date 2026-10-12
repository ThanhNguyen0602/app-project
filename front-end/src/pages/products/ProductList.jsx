import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import ProductFilters from "../products/ProductFilter";
import ProductResults from "../products/Productresult";

import { products } from "../products/dataProducts";
import { filterProducts, sortProducts } from "../../utils/productUtils";

const ProductList = () => {
  // Lấy từ khóa tìm kiếm từ URL
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";

  // State bộ lọc
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  // Lọc sản phẩm
  const filteredProducts = filterProducts(products, {
    keyword,
    category,
    priceFilter,
  });

  // Sắp xếp
  const sortedProducts = sortProducts(filteredProducts, sort);

  // Phân trang
  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const currentPage = Math.min(page, Math.max(1, totalPages));

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Xử lý thay đổi bộ lọc
  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handlePriceChange = (value) => {
    setPriceFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Tất cả sản phẩm</h2>

      <ProductFilters
        category={category}
        priceFilter={priceFilter}
        sort={sort}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        onSortChange={handleSortChange}
      />

      <p>Tìm thấy {sortedProducts.length} sản phẩm</p>

      <ProductResults
        products={currentProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Container>
  );
};

export default ProductList;
