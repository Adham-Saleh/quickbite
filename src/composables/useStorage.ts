import { projectStorage } from "@/firebase/config";
import getUser from "./getUser";
import { ref } from "vue";

import { ref as stRef, getDownloadURL, uploadBytes } from "firebase/storage";

const useStorage = function () {
  const error = ref<boolean | null>(null);
  const filePath = ref("");
  const url = ref("");
  const { user } = getUser();

  const uploadImg = async function (file: any) {
    if (!user.value) return;
    filePath.value = `cover/${user.value.uid}/${file.value.name}`;
    const storageRef = stRef(projectStorage, filePath.value);
    try {
      const res = await uploadBytes(storageRef, file.value);
      url.value = await getDownloadURL(res.ref);


    } catch (err: any) {
      error.value = err.message;
    }
  };

  return { error, url, uploadImg };
};

export default useStorage;
