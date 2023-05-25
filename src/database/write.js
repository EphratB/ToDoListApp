import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function save(data) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}
//update tasks from database

export async function update(id, data) {
  try {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, data);
    console.log("Document updated successfully.");

    return true;
  } catch (e) {
    console.log("Error updating document: ", e);

    return false;
  }
}

//remove tasks from database
export async function remove(id) {
  try {
    await deleteDoc(doc(db, "tasks", id));
    console.log("Task deleted successfully!");
    return true;
  } catch {
    console.log("Failed to delete task.");
    return false;
  }
}

// remove all tasks from database

export async function removeAll(id) {
  try {
    await deleteDoc(doc(db, "tasks", id));
    toast.success("Task deleted successfully!");
    return true;
  } catch {
    toast.error("Failed to delete task.");
    return false;
  }
}
