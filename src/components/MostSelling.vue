<template>
  <div class="container">
    <h3>Most Selling</h3>
    <div class="row justify-content-center" v-if="itemForEachShop">
      <div class="col-md-6 col-lg-3" v-for="shop in itemForEachShop" :key="shop.id">
        <ListShopMenu :shop="shop" :id="shop.id" :ownership="shop.userId === user.uid" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import getCollection from "@/composables/getCollection";
import ListShopMenu from "./ListShopMenu.vue";
import getUser from "@/composables/getUser";

export default defineComponent({
  components: { ListShopMenu },
  setup() {
    const { documents: shops } = getCollection("shops");
    const { user } = getUser();

    const itemForEachShop = computed(() => shops.value.map((shop) => {
        return {...shop, menu: [shop.menu[0]]}
    }))

    return { shops, user, itemForEachShop };
  },
});
</script>

<style></style>
