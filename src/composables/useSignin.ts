import { ref } from "vue";
import { projectAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref<string | null>(null);
const isPending = ref<boolean>(false);

const signin = async function (
  username: string,
  email: string,
  password: string
) {
  error.value = null;
  isPending.value = true;

  console.log(username, email, password)
  debugger;
  try {
    const res = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );

    console.log(res)

    await updateProfile(res.user, { displayName: username });
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err: any) {
    console.log(err);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignin = function () {
  return { error, isPending, signin };
};

export default useSignin;
