import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";

const error = ref<null | string>(null);
const isPending = ref<boolean>(false);

const addDocuments = async function (collectionName: string, data: object) {
  error.value = null;
  isPending.value = true;
  const docRef = collection(projectFirestore, collectionName);

  try {
    const saveDoc = await addDoc(docRef, data);

    isPending.value = false;
    error.value = null;
    return saveDoc;
  } catch (err) {
    console.log(err)
    error.value = "cannot create shop, please try again later";
    isPending.value = false;
  }
};

const useCollection = function () {
  return { error, isPending, addDocuments };
};

export default useCollection;
