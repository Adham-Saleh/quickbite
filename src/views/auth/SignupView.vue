<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <form
          class="form bg-light p-4 py-5 p-lg-5 rounded"
          @submit.enter.prevent="handleSubmit"
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
              v-model="username"
              required
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="email"
              required
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="password"
              required
            />
            <label for="floatingPassword">Password</label>
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
import { defineComponent, ref } from "vue";
import useSignin from "@/composables/useSignin";
import useCollection from "@/composables/useCollection";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const username = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const { error, isPending, signin } = useSignin();
    const { addDocuments } = useCollection();
    const router = useRouter();

    const handleSubmit = async function () {
      const newUser = await signin(username.value, email.value, password.value);
      await addDocuments("users", { userId: newUser?.user.uid, cart: [] });
      if (error.value) return;
      router.push({ name: "home" });
    };

    return { username, email, password, handleSubmit, error, isPending };
  },
});
</script>

<style></style>
