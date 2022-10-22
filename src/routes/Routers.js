import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import CateringPage from "../pages/CateringPage";
import ServicesPage from "../pages/ServicesPage";
import DropoffPage from "../pages/DropoffPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin/AdminPage";
import OrdersPage from "../pages/Admin/OrdersPage";
import CreateContainer from "../pages/Admin/CreateContainer";
import MyOrders from "../pages/UserProfile/Orders";
import Dashboard from "../pages/UserProfile/Dashboard";
import ProfileInfo from "../pages/UserProfile/ProfileInfo";
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
        <Route path="orderspage" element={<OrdersPage />} />
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
