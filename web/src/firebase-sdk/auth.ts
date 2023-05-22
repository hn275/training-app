import { getAuth } from "firebase/auth";
import { firebase } from "./config";

export const auth = getAuth(firebase);
export * as firebaseAuth from "firebase/auth";
