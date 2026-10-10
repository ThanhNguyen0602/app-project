import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <header className="site-header">
      <Link to="/" className="shop-logo">
        <img src="../../public/images/tv-logo.png.png" alt="TV Studio Logo" />
        <span>TV Studio</span>
      </Link>

      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit" className="search-btn" aria-label="Tìm kiếm">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </form>

      <Link to="/cart" className="cart-link" aria-label="Giỏ hàng">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.4 12.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      </Link>
    </header>
  );
};

export default Header;
