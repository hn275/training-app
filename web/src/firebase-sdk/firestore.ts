import { getFirestore } from "firebase/firestore";
import { firebase } from "./config";

export const db = getFirestore(firebase);
export * as firestore from "firebase/firestore";

export enum FirestoreCollections {
  exercises = "exercises",
}

export type Exercise = {
  id?: string;
  userID: string;
  desc: string;
  title: string;
  data?: ExerciseData[];
};

export type ExerciseData = {
  weight: number;
  duration: number; // in seconds
  note: string;
};
