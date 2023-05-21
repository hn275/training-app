import { firebase } from "./firebase";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(firebase);
export * as firebaseAuth from "firebase/auth";
export * as firestore from "firebase/firestore";

export class Firetore {
  private userID: string;
  private doc: string;

  constructor(userID: string) {
    this.userID = userID;
  }

  public getDoc(d: string): this {
    this.doc = d;
    return this;
  }
}
