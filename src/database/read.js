import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

/**
 * loads all the users from the database
 * @returns
 * a promise that resolves to an array of tasks
 */

export async function load() {
  try {
    console.log("loading ...");
    const collectionRef = collection(db, "tasks");
    const querySnapshot = await getDocs(collectionRef);

    // const querySnapshot = await getDocs(collection(db, "tasks"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data; // this is not returning the data rather it is returning a promise and the App.js async will handle the result
  } catch (err) {
    throw new Error("Failed to load the database");
  }
}

/** selective loading where status is true / completed
 *
 * @returns   a promise that resolves to an array of completed tasks
 */

export async function loadCompleted() {
  const q = query(collection(db, "tasks"), where("status", "==", true));
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
}
export function loadById(id) {
  console.log("Load Id:", id);
}
