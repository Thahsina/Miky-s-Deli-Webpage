import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase.config";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";


export const saveUser = async (userData) => {
  await setDoc(doc(firestore, "users", `${Date.now()}`), userData, {
    merge: true,
  });
};

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "menuItems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const saveReviewFS = async (reviewData) => {
  await setDoc(doc(firestore, "testimonials", `${Date.now()}`), reviewData, {
    merge: true,
  });
};

export const saveOrder = async (orderData) => {
  await setDoc(doc(firestore, "orders", orderData.id), orderData, {
    merge: true,
  });
};

export const saveCateringOrder = async (cateringOrderData) => {
  await setDoc(doc(firestore, "cateringOrders", cateringOrderData.id), cateringOrderData, {
    merge: true,
  });
};

export const saveDropOffOrder = async (dropOffOrderData) => {
  await setDoc(doc(firestore, "dropoffOrders", dropOffOrderData.id), dropOffOrderData, {
    merge: true,
  });
};

//get all reviews from firestore
export const getAllReviews = async () => {
  const reviews = await getDocs(
    query(collection(firestore, "testimonials"), orderBy("id", "desc"))
  );
  return reviews.docs.map((doc) => doc.reviewData());
};

//get all menu items from firestore
export const getAllMenuItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "menuItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

//get all catering menu items from firestore
export const getCateringMenuItems = async () => {
  const cateringItems = await getDocs(
    query(collection(firestore, "cateringMenuItems"))
  );
  return cateringItems.docs.map((doc) => doc.data());
};

//get all drop-off menu items from firestore
export const getDropoffMenuItems = async () => {
  const dropoffItems = await getDocs(
    query(collection(firestore, "dropoffMenuItems"))
  );
  return dropoffItems.docs.map((doc) => doc.data());
};

//get all orders from firestore
export const getAllOrders = async () => {
  const orders = await getDocs(
    query(collection(firestore, "orders"), orderBy("id", "desc"))
  );
  return orders.docs.map((doc) => doc.data());
};

export const acceptOrders = async (selectedOrder) => {
  await setDoc(doc(firestore, "prevOrders", selectedOrder.id), selectedOrder, {
    merge: true,
  });
  deleteDoc(doc(firestore, "orders", selectedOrder.id));
};

export const getAcceptedOrders = async () => {
  const acceptedOrders = await getDocs(
    query(collection(firestore, "prevOrders"), orderBy("id", "desc"))
  );
  return acceptedOrders.docs.map((doc) => doc.data());
};

// export const removeAcceptedOrders = async (id) => {
//   await deleteDoc(doc(firestore, "orders", id));
// };

export const fetchAllOrders = async () => {
  await getAllOrders().then((orderData) => {
    const [dispatch] = useStateValue();
    // console.log(data);
    dispatch({
      type: actionType.SET_ORDERS,
      orders: orderData,
    });
  });
};


export const getAllCateringOrders = async () => {
  const cateringOrders = await getDocs(
    query(collection(firestore, "cateringOrders"), orderBy("id", "desc"))
  );
  return cateringOrders.docs.map((doc) => doc.data());
};


export const getAllDropOffOrders = async () => {
  const dropOffOrders = await getDocs(
    query(collection(firestore, "dropoffOrders"), orderBy("id", "desc"))
  );
  return dropOffOrders.docs.map((doc) => doc.data());
};
// export const fetchAcceptedOrders = async () => {
//   await getAcceptedOrders().then((acceptedOrderData) => {
//     const [dispatch] = useStateValue();
//     dispatch({
//       type: actionType.SET_ACCEPTEDORDERS,
//       acceptedOrders: acceptedOrderData,
//     });
//   });
// };
