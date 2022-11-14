import React from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Routes from "../routes/Routers";
import Area from "../pages/Area";

import ScrollToTop from "../Components/UI/ScrollToTop";
import ServicesHeader from "../Components/Header/ServicesHeader";

const Layout = () => {
  

  return (
    <AnimatePresence>
      <ScrollToTop />
      <div>
        <Area/>
        {window.location.pathname === "/services/catering" ? (
          <ServicesHeader />
        ) : (
          <Header />
        )}
        
        <Header />

        <div>
          <Routes />
        </div>

        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Layout;
