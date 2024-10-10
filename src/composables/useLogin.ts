import { ref } from "vue";
import { projectAuth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref<string | null>(null);
const isPending = ref<boolean>(false);

const login = async function (email: string, password: string) {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithEmailAndPassword(projectAuth, email, password);
    
    isPending.value = false;
    error.value = null;
    return res;
  } catch (err: any) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogin = function () {
  return { error, isPending, login };
};

export default useLogin;
