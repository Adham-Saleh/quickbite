<template>
  <div class="container mt-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-lg-5">
        <h2>QuickBite 😋</h2>
        <h4>
          Craving something fast and delicious? Quickbite has got you covered!
        </h4>
        <p class="lead">
          With just a tap, fresh and flavorful meals are on their way to your
          door. Whether it's lunch at work, dinner for the family, or a
          late-night snack, we deliver your cravings—fast and fresh, every time.
          Quick, tasty, and reliable—because your hunger can't wait!
        </p>
        <router-link :to="{name: 'browseShops'}" class="btn btn-success btn-lg">Start ordering now!</router-link>
      </div>
      <div class="col-5">
        <img
          src="../assets/142.jpg"
          class="img-fluid d-none d-md-block"
          alt="fast delivery"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
