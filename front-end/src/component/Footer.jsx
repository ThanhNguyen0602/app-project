import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* THƯƠNG HIỆU */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="../../public/images/tv-logo.png.png" alt="TV Studio" />
            <span>TV STUDIO</span>
          </Link>

          <p>
            TV Studio - Nơi phong cách gặp gỡ sự tinh tế. Khám phá thời trang
            mang dấu ấn riêng của bạn.
          </p>
        </div>

        {/* KHÁM PHÁ */}
        <div className="footer-column">
          <h3>KHÁM PHÁ</h3>

          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/about">Giới thiệu</Link>
        </div>

        {/* HỖ TRỢ */}
        <div className="footer-column">
          <h3>HỖ TRỢ</h3>

          <Link to="/contact">Liên hệ</Link>
          <Link to="/faq">Câu hỏi thường gặp</Link>
          <Link to="/shipping">Chính sách giao hàng</Link>
        </div>

        {/* CHÍNH SÁCH */}
        <div className="footer-column">
          <h3>CHÍNH SÁCH</h3>

          <Link to="/returns">Đổi trả sản phẩm</Link>
          <Link to="/privacy">Bảo mật thông tin</Link>
          <Link to="/terms">Điều khoản sử dụng</Link>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TV Studio. All rights reserved.</p>

        <span>ELEVATE YOUR STYLE</span>
      </div>
    </footer>
  );
};

export default Footer;
