<template>
  <div class="container mt-5">
    <ListShops :shops="myShops" />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import ListShops from "@/components/ListShops.vue";
import getCollections from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default defineComponent({
  components: { ListShops },
  setup() {
    const { documents } = getCollections("shops");
    const { user } = getUser();

    const myShops = computed(() =>
      documents.value.filter((shop) => shop.userId === user.value.uid)
    );

    return { myShops };
  },
});
</script>

<style></style>
