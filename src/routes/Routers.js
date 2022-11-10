import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import CateringPage from "../pages/Services.jsx/CateringPage";
import ServicesPage from "../pages/Services.jsx/ServicesPage";
import DropoffPage from "../pages/Services.jsx/DropoffPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin/AdminPage";
import OrdersPage from "../pages/Admin/OrdersPage";
import CurrentOrdersPage from "../pages/Admin/CurrentOrdersPage";
import AcceptedOrdersPage from "../pages/Admin/AcceptedOrdersPage";
import CreateContainer from "../pages/Admin/CreateContainer";
import MyOrders from "../pages/UserProfile/Orders";
import CateringOrders from "../pages/UserProfile/CateringOrders";
import DropoffOrders from "../pages/UserProfile/DropoffOrders";
import CateringOrdersAdmin from "../pages/Admin/CateringOrdersAdmin";
import DropoffOrdersAdmin from "../pages/Admin/DropoffOrdersAdmin";
import Dashboard from "../pages/UserProfile/Dashboard";
import ProfileInfo from "../pages/UserProfile/ProfileInfo";
import Map from "../Components/UI/Map";
import NotFoundPage from "../Components/UI/notFoundPage";
// import CardSkeleton from "../Components/UI/CardSkeleton";
const LazyMenu = React.lazy(() => import("../pages/Menu"));

const Routers = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
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
        <Route path="cateringOrderspage" element={<CateringOrdersAdmin />} />
        <Route path="dropOffOrderspage" element={<DropoffOrdersAdmin />} />
        <Route path="orderspage" element={<OrdersPage />}>
          <Route path="currentOrders" element={<CurrentOrdersPage />} />
          <Route path="acceptedOrders" element={<AcceptedOrdersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/map" element={<Map />} />

      {/* user dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profileInfo" element={<ProfileInfo />} />
        <Route path="myorders" element={<MyOrders />} />
        <Route path="cateringorders" element={<CateringOrders />} />
        <Route path="dropofforders" element={<DropoffOrders />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
