<template>
  <NavBar />
  <router-view />
  <PageFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import PageFooter from "@/components/PageFooter.vue";

export default defineComponent({
  components: { NavBar, PageFooter },
});
</script>

<style>

</style>
