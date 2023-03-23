import { CollectionReference, DocumentData, addDoc } from "firebase/firestore";

export const addDocToCollection = async (
  collection: CollectionReference<DocumentData>,
  doc: {}
) => {
  await addDoc(collection, doc);
};
