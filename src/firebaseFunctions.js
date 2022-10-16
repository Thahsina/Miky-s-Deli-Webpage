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

//get all menu items from firestore

export const getAllReviews = async () => {
  const reviews = await getDocs(query(collection(firestore, "testimonials"), orderBy("id","desc")));
  return reviews.docs.map((doc) => doc.reviewData());
}

export const getAllMenuItems = async () => {
  const items = await getDocs(query(collection(firestore, "menuItems"), orderBy("id","desc")));
  return items.docs.map((doc) => doc.data());
}

export const getCateringMenuItems = async () => {
  const cateringItems = await getDocs(query(collection(firestore, "cateringMenuItems")));
  return cateringItems.docs.map((doc) => doc.data());
}

export const getDropoffMenuItems = async () => {
  const dropoffItems = await getDocs(query(collection(firestore, "dropoffMenuItems")));
  return dropoffItems.docs.map((doc) => doc.data());
}