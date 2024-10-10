import { projectFirestore } from "@/firebase/config";
import {doc, onSnapshot } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import Shop from "@/types/shop";
import Cart from "@/types/cart";

const getDocument = function (collectionName: string, id: string) {
  const error = ref<null | string>(null);
  const document = ref<Shop | null>(null);

  const docRef = doc(projectFirestore, collectionName, id);

  const unsub = onSnapshot(
    docRef,
    (newDoc: any) => {
      if (newDoc.data()) {
        document.value = { ...newDoc.data(), id: newDoc.id };
        error.value = null;
      }

      if (!newDoc.data()) {
        error.value = `could not find a shop with this id ${id}`;
      }
    },
    (err: any) => {
      error.value = "Error fetching data! please try again later.";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return {error, document}
};

export default getDocument;
