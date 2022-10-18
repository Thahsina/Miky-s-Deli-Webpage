import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Routes from "../routes/Routers";
// import Offers from "../Components/UI/Offers"
// import "..App.css"
import Area from "../pages/Area";

import ScrollToTop from "../Components/UI/ScrollToTop";
import ServicesHeader from "../Components/Header/ServicesHeader";

const Layout = () => {
  // useEffect(()=>{
  //   console.log("useEffect Ran")
  // },[])

  return (
    <AnimatePresence>
      <ScrollToTop />
      <div>
        {/* <Area/> */}
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
