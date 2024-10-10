import { projectFirestore } from "@/firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";

const useDocument = function (collectionName: string, id: string) {
  const error = ref<null | string>(null);
  const isPending = ref<boolean>(false);
  const docRef = doc(projectFirestore, collectionName, id);
  console.log(docRef);

  const updateDocument = async function (newData: object) {
    isPending.value = true;
    error.value = null;

    try {
      const res = await updateDoc(docRef, newData);

      isPending.value = false;
      error.value = null;
      return res;
    } catch (err: any) {
      console.log(err);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const deleteDocument = async function () {
    error.value = null
    isPending.value = true;
    try {
      await deleteDoc(docRef);

      isPending.value = false;
      error.value = null;
    } catch (err: any) {
      error.value = err.message;
    }
    isPending.value = false;
  };

  return { error, isPending, updateDocument, deleteDocument };
};

export default useDocument;
