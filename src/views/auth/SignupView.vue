<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <form
          class="form bg-light p-4 py-5 p-lg-5 rounded"
          @submit.enter.prevent="submit"
        >
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <h4>Sing up</h4>
          <div class="form-floating mb-3">
            <input
              type="username"
              class="form-control"
              id="floatingInput"
              placeholder="e.g. Adham-Saleh"
              v-bind="username"
              required
            />
            <label for="floatingInput">Username</label>
            <div v-if="getError('username')" class="text-danger">
              {{ getError("username") }}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-bind="email"
              required
            />
            <label for="floatingInput">Email address</label>
            <div v-if="getError('email')" class="text-danger">
              {{ getError("email") }}
            </div>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-bind="password"
              required
            />
            <label for="floatingPassword">Password</label>
            <div v-if="getError('password')" class="text-danger">
              {{ getError("password") }}
            </div>
            <button
              class="btn btn-success mt-3 me-2"
              type="submit"
              v-if="!isPending"
            >
              Sign-up
            </button>
            <button
              class="btn btn-success mt-3 me-2"
              type="button"
              v-if="isPending"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
            <router-link
              class="btn btn-outline-success mt-3"
              :to="{ name: 'login' }"
              >Login</router-link
            >
          </div>
        </form>
        <p class="muted text-center mt-2 align-items-center">
          <span>&copy; copyrights reserved by </span>
          <router-link :to="{ name: 'home' }">QuickBite</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import useSignin from "@/composables/useSignin";
import useCollection from "@/composables/useCollection";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { string, object } from "yup";

export default defineComponent({
  setup() {
    const { error, isPending, signin } = useSignin();
    const { addDocuments } = useCollection();
    const router = useRouter();

    const signupSchema = object({
      username: string().required("Field is required"),
      email: string()
        .email("Please enter a valid email")
        .required("Field is required"),
      password: string()
        .required("Field is required")
        .min(6, "Password must be at least 6 characters"),
    });

    const { defineInputBinds, values, errorBag, handleSubmit } = useForm({
      validationSchema: signupSchema,
    });

    const username = defineInputBinds("username");
    const email = defineInputBinds("email");
    const password = defineInputBinds("password");

    const getError = function (name: string) {
      const err = errorBag.value[name];
      return err ? err[0] : false;
    };

    const submit = handleSubmit(async function () {
      const newUser = await signin(
        values.username,
        values.email,
        values.password
      );
      await addDocuments("users", { userId: newUser?.user.uid, cart: [] });
      if (error.value) return;
      router.push({ name: "home" });
    });

    return { username, email, password, submit, error, isPending, getError };
  },
});
</script>

<style></style>
