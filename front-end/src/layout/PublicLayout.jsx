import { Outlet } from "react-router-dom";

import Header from "../component/Header";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const PublicLayout = () => {
  return (
    <div className="container">
      <div className="public-layout">
        <Header />

        <Navbar />

        <main className="site-main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
