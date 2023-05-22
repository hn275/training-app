import { getFirestore } from "firebase/firestore";
import { firebase } from "./config";

export const db = getFirestore(firebase);
export * as firestore from "firebase/firestore";
