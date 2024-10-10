import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";
import { collection, onSnapshot } from "firebase/firestore";

const useCollection = function (collectionName: string) {
  const error = ref<null | string>(null);
  const documents = ref([]);

  const docRef = collection(projectFirestore, collectionName);

  onSnapshot(docRef, (doc: any) => {
    documents.value = doc.docs.map((shop: any) => ({
      ...shop.data(),
      id: shop.id,
    }));
  });
  
  
  return { error, documents };
};


export default useCollection;