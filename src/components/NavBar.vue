<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand"
        >QuickBite</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-start justify-content-end"
        id="navbarSupportedContent"
        tabindex="-1"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            <router-link :to="{ name: 'home' }" class="text-decoration-none text-dark"
              >QuickBite</router-link
            >
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body justify-content-end">
          <ul class="navbar-nav">
            <div class="d-block d-lg-flex align-items-center" v-if="user">
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link" :to="{ name: 'createShop' }"
                  >Create shop</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link" :to="{ name: 'myShops' }"
                  >My shops</router-link
                >
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link class="nav-link" :to="{ name: 'orders' }">
                  <span class="badge rounded-pill text-bg-primary">Orders</span>
                </router-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link
                  class="nav-link"
                  :to="{ name: 'cart', params: { id: userDocument[0].id } }"
                  v-if="userDocument[0]"
                >
                  <span class="badge rounded-pill text-bg-primary"
                    ><i class="bi bi-cart2"></i> Your cart
                    {{
                      userDocument[0].cart.length
                        ? userDocument[0].cart.length
                        : ""
                    }}</span
                  >
                </router-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <button
                  @click="handleClick"
                  class="btn btn-danger btn-sm mt-2 mt-lg-0 ms-lg-3"
                  v-if="!isPending"
                >
                  Logout
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
                </button>
              </li>
            </div>
            <div class="d-block d-lg-flex align-items-center" v-if="!user">
              <li class="nav-item me-2" data-bs-dismiss="offcanvas">
                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  :to="{ name: 'signup' }"
                  >sing up</router-link
                >
              </li>
              <li class="nav-item mt-2 mt-lg-0" data-bs-dismiss="offcanvas">
                <router-link
                  class="btn btn-sm btn-secondary"
                  :to="{ name: 'login' }"
                  >login</router-link
                >
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, defineComponent } from "vue";
import getUser from "../composables/getUser";
import useSingout from "../composables/useSignout";
import { useRouter } from "vue-router";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  setup() {
    const { user } = getUser();
    const { isPending, signout } = useSingout();
    const router = useRouter();

    const { documents } = getCollection("users");
    const userDocument = computed(() =>
      documents.value.filter((document) => document.userId === user.value.uid)
    );

    const handleClick = async function () {
      await signout();
      router.push({ name: "home" });
    };

    return { user, isPending, handleClick, userDocument };
  },
});
</script>

<style></style>
