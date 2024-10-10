import { ref } from "vue";
import { projectAuth } from "@/firebase/config";
import { signOut } from "firebase/auth";

const error = ref<string | null>(null);
const isPending = ref<boolean>(false);

const signout = async function () {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signOut(projectAuth);

    isPending.value = false;
    error.value = null;
    console.log(res);
    return res;
  } catch (err: any) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignout = function () {
  return { error, isPending, signout };
};

export default useSignout;
