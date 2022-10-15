import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
// import Menu from "../pages/Menu";
import CateringPage from "../pages/CateringPage";
import ServicesPage from "../pages/ServicesPage";
import DropoffPage from "../pages/DropoffPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SideBar from "../pages/UserProfile/SideBar";
import Admin from "../pages/Admin";
import CreateContainer from "../pages/CreateContainer";
// import ProfileLayout from '../pages/UserProfile/ProfileLayout'
import MyOrders from "../pages/UserProfile/Orders";
import OrdersPage from "../pages/OrdersPage"
import Dashboard from "../pages/UserProfile/Dashboard";
import ProfileInfo from "../pages/UserProfile/ProfileInfo";
// import Addresses from "../pages/UserProfile/Addresses";
import Map from "../Components/UI/Map";
import CardSkeleton from "../Components/UI/CardSkeleton";
const LazyMenu = React.lazy(() => import("../pages/Menu"));

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/profile" element={<UserProfile />} /> */}

      {/* <Route path="/menu" element={<Menu />} /> */}
      <Route
        path="/menu"
        element={
          <React.Suspense fallback="Loading">
            <LazyMenu />
          </React.Suspense>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
 
      <Route path="/services" element={<ServicesPage />}>
        <Route path="catering" element={<CateringPage />} />
        <Route path="dropoff" element={<DropoffPage />} />
      </Route>

      
      <Route path="/admin" element={<Admin />}>
      <Route path="createItem" element={<CreateContainer />} />
      <Route path="orderspage" element={<OrdersPage/>}/>
      </Route>

      <Route path="/map" element={<Map />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profileInfo" element={<ProfileInfo />} />
        <Route path="myorders" element={<MyOrders />} />
        <Route path="*" element={<> not found</>} />
      </Route>
    </Routes>
  );
};

export default Routers;
