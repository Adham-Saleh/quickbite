<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <form
          class="form bg-light p-4 p-lg-5 py-5 rounded"
          @submit.enter.prevent="handleSubmit"
        >
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <h4>Login</h4>
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
              Login
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
              :to="{ name: 'signup' }"
              >Sign-up</router-link
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
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const email = ref<string>("");
    const password = ref<string>("");
    const router = useRouter();

    const { error, isPending, login } = useLogin();

    const handleSubmit = async function () {
      await login(email.value, password.value);
      if (error.value) return;
      router.push({ name: "home" });
    };

    return { email, password, error, isPending, handleSubmit };
  },
});
</script>

<style></style>
