import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsCollection = collection(db, 'products');

export const findAll = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((product) => ({ id: product.id, ...product.data() }));
};

export const findById = async (id) => {
  const snapshot = await getDoc(doc(db, 'products', id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const create = async (product) => {
  const reference = await addDoc(productsCollection, product);
  return { id: reference.id, ...product };
};

export const update = async (id, product) => {
  const reference = doc(db, 'products', id);
  await updateDoc(reference, product);
  const snapshot = await getDoc(reference);
  return { id: snapshot.id, ...snapshot.data() };
};

export const remove = async (id) => {
  await deleteDoc(doc(db, 'products', id));
};
