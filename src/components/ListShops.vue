<template>
  <div class="container">
    <div class="row">
      <!-- transition not working -->
      <transition-group name="move-shops" appear>
        <div
          class="col-lg-4 col-md-6 mt-5 mt-lg-0 d-flex justify-content-center d-lg-block"
          v-for="shop in shops"
          :key="shop.id"
        >
          <router-link
            :to="{ name: 'shopDetails', params: { id: shop.id } }"
            class="text-decoration-none"
          >
            <div class="card shadow" style="width: 18rem">
              <img
                :src="shop.coverUrl"
                class="card-img-top img-fluid"
                alt="logo-cover"
              />
              <div class="card-body">
                <h5 class="card-title fw-bolder">{{ shop.shopTitle }}</h5>
                <div class="card-text">
                  <div>
                    <span class="align-items-center">
                      <h6>
                        {{ shop.location }}
                        <span class="badge text-bg-danger m-0">{{
                          shop.foodType
                        }}</span>
                      </h6>
                    </span>
                    <span class="text-muted"
                      >{{ shop.opHoursFrom }} - {{ shop.opHoursTo }}</span
                    >
                    <br />
                    <span class="align-items-center">
                      <h6>
                        <span class="badge text-bg-success m-0">Working..</span>
                      </h6>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <!-- ended -->
        </div>
      </transition-group>
      <!-- ended -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["shops"],
});
</script>

<style>
.move-shops-enter-from,
.move-shops-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.move-shops-enter-to,
.move-shops-leave-from {
  opacity: 1;
  transform: scale(1);
}
.move-shops-enter-active {
  transition: all 0.3s ease;
}

.move-shops-leave-active {
  position: absolute;
  z-index: -1;
}

.move-shops-move {
  transition: all 0.3s ease;
}
</style>
