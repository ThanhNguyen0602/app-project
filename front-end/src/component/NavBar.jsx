import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <BootstrapNavbar
      expand="lg"
      collapseOnSelect
      data-bs-theme="dark"
      className="site-navbar"
    >
      <Container fluid className="nav-inner">
        {/* LOGO */}
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="nav-brand"
          aria-label="Trang chủ TV Studio"
        >
          <svg
            className="nav-brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 3 21 6 19 11 16 9V21H8V9L5 11 3 6 8 3a4 4 0 0 0 8 0Z" />
          </svg>
          <small>EST. 2026</small>
        </BootstrapNavbar.Brand>

        {/* MOBILE TOGGLE */}
        <BootstrapNavbar.Toggle
          aria-controls="main-shop-nav"
          aria-label="Mở menu"
        />

        {/* MENU */}
        <BootstrapNavbar.Collapse id="main-shop-nav">
          <Nav className="nav-menu mx-lg-auto">
            <Nav.Link as={NavLink} to="/" end>
              Trang chủ
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products" end>
              Sản phẩm
            </Nav.Link>

            <Nav.Link as={Link} to="/products?category=ao">
              Áo
            </Nav.Link>

            <Nav.Link as={Link} to="/products?category=quan">
              Quần
            </Nav.Link>

            <Nav.Link as={Link} to="/products?category=phu-kien">
              Phụ kiện
            </Nav.Link>
          </Nav>

          {/* SALE */}
          <Nav className="nav-action">
            <Nav.Link as={Link} to="/products?onSale=true" className="nav-sale">
              SALE <span>↗</span>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
