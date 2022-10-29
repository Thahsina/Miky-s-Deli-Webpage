import Layout from "./Components/Layout";
import "./App.css";
import { useEffect, useState } from "react";
import Area from "./pages/Area";
import { useStateValue } from "./context/StateProvider";
import {
  getAllMenuItems,
  getCateringMenuItems,
  getDropoffMenuItems,
  getAllOrders,
  getAcceptedOrders,
} from "./firebaseFunctions";
import { actionType } from "./context/reducer";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const [{ menuItems,acceptedOrders,user }, dispatch] = useStateValue();
  

  const fetchMenuItems = async () => {
    await getAllMenuItems().then((data) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_MENU_ITEMS,
        menuItems: data,
      });
    });
  };

  const fetchCateringMenuItems = async () => {
    await getCateringMenuItems().then((cateringData) => {
      // console.log(cateringData);
      dispatch({
        type: actionType.SET_CATERINGMENU_ITEMS,
        cateringMenuItems: cateringData,
      });
    });
  };

  const fetchDropoffMenuItems = async () => {
    await getDropoffMenuItems().then((dropoffData) => {
      // console.log(dropoffData);
      dispatch({
        type: actionType.SET_DROPOFFMENU_ITEMS,
        dropoffMenuItems: dropoffData,
      });
    });
  };

  const fetchAllOrders = async () => {
    await getAllOrders().then((orderData) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_ORDERS,
        orders: orderData,
      });
    });
  };

  const fetchAcceptedOrders = async () => {
    await getAcceptedOrders().then((acceptedOrderData) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_ACCEPTEDORDERS,
        acceptedOrders: acceptedOrderData,
      });
    });
  };

  

  useEffect(() => {
    fetchDropoffMenuItems();
    fetchCateringMenuItems();
    fetchMenuItems();
    fetchAllOrders();
    fetchAcceptedOrders();
    
  }, []);
  //  useEffect(()=>{<Area/>},[])
  return (
    <SkeletonTheme duration={2} baseColor="#666464" highlightColor="#525252">
      <Layout />
    </SkeletonTheme>
  );
}

export default App;
