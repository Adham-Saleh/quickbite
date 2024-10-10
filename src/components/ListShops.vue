<template>
  <div class="container">
    <div class="row">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ['shops']
});
</script>

<style></style>
