<template>
  <div class="container my-5">
    <h3>Shops</h3>
    <div class="row mt-2">
      <div class="col-md-6 col-lg-3">
        <router-link class="text-decoration-none" :to="{ name: 'browseShops' }">
          <div class="card">
            <img
              src="../assets/allShops.jpeg"
              class="card-img-top"
              style="max-height: 300px"
              alt=""
            />
            <div class="card-footer fw-bolder">All Shops</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link class="text-decoration-none" :to="{ name: 'browseShops' }">
          <div class="card mt-2 mt-lg-0">
            <img
              src="../assets/egyptionFood1.jpg"
              class="card-img-top"
              style="max-height: 300px"
              alt=""
            />
            <div class="card-footer fw-bolder">Egyption Food</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link class="text-decoration-none" :to="{ name: 'browseShops' }">
          <div class="card mt-2 mt-lg-0">
            <img
              src="../assets/pizza.jpg"
              class="card-img-top"
              style="max-height: 300px"
              alt=""
            />
            <div class="card-footer fw-bolder">Italian Food</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 col-lg-3">
        <router-link class="text-decoration-none" :to="{ name: 'browseShops' }">
          <div class="card mt-2 mt-lg-0">
            <img
              src="../assets/shushi.jpg"
              class="card-img-top"
              style="max-height: 300px"
              alt=""
            />
            <div class="card-footer fw-bolder">Chienese Food</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
