import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firebase.config";

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
  await setDoc(
    doc(firestore, "cateringOrders", cateringOrderData.id),
    cateringOrderData,
    {
      merge: true,
    }
  );
};

export const saveDropOffOrder = async (dropOffOrderData) => {
  await setDoc(
    doc(firestore, "dropoffOrders", dropOffOrderData.id),
    dropOffOrderData,
    {
      merge: true,
    }
  );
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
    query(
      collection(firestore, "menuItems")
      // , orderBy("id", "desc")
    )
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
