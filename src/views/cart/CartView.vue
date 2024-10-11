<template>
  <div class="container mt-5 justify-content-center align-items-center">
    <div class="row">
      <div class="col-md-6">
        <h3 class="d-flex">
          <span class="me-2">Cart</span>
          <div v-if="isPending">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </h3>
        <div class="container" v-if="document">
          <div class="row" v-if="!document.cart.length">
            <span>No items</span>
            <router-link :to="{ name: 'browseShops' }"
              >browse shops now</router-link
            >
          </div>
          <!-- cart items -->
          <transition-group name="cart-items">
            <div class="row" v-for="item in document.cart" :key="item.id">
              <div class="card mb-3 p-0" style="max-width: 540px">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      :src="item.coverUrl"
                      class="img-thumbnail rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5
                        class="card-title fw-bolder d-flex justify-content-between align-items-center"
                      >
                        <span>{{ item.title }}</span>
                        <span
                          ><button
                            class="btn btn-danger"
                            v-if="!isPending"
                            @click="handleItemDelete(item.id)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </span>
                      </h5>
                      <p class="card-text">
                        {{ item.description }}
                      </p>
                      <p>
                        <span>Price: {{ item.price }}EGP - </span>
                        <span>Quantity: {{ item.quantity }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
          <!-- ended -->
        </div>
      </div>
      <div class="col">
        <div class="container">
          <h3>Summary</h3>
          <div class="row mt-3" v-if="document">
            <div class="col-12 d-flex justify-content-between w-100">
              <p class="lead fw-bolder">Subtotal</p>
              <p class="fw-bolder">{{ subTotal }}EGP</p>
            </div>
            <div class="col-12 d-flex justify-content-between w-100">
              <p class="lead fw-bolder">Offer</p>
              <p class="fw-bolder text-danger text-decoration-line-through">
                {{ offer }}EGP
              </p>
            </div>
            <div class="col-12 d-flex justify-content-between w-100">
              <p class="lead fw-bolder">Delivery</p>
              <p class="fw-bolder">20EGP</p>
            </div>
            <div class="col-12 d-flex justify-content-between w-100">
              <p class="lead fw-bolder">Total</p>
              <p class="fw-bolder">{{ subTotal - offer }}EGP</p>
            </div>
            <div class="col-12 d-flex justify-content-between w-100">
              <button
                class="btn btn-success"
                @click="handleCheckout"
                v-if="!cartPending"
              >
                checkout
              </button>
              <button
                class="btn btn-success me-2"
                type="button"
                v-if="cartPending"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            </div>
            <span class="text-danger" v-if="checkoutError">cart is empty</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import useCollection from "@/composables/useCollection";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default defineComponent({
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { document } = getDocument("users", props.id);
    const { isPending, updateDocument } = useDocument("users", props.id);
    const { isPending: cartPending, addDocuments } = useCollection();
    const router = useRouter();
    const checkoutError = ref(false);

    const subTotal = computed(() =>
      document.value.cart.reduce(
        (acc, val) => acc + +val.price * +val.quantity,
        0
      )
    );

    const offer = computed(() =>
      document.value.cart.reduce(
        (acc, val) => acc + +val.sale * +val.quantity,
        0
      )
    );

    const handleItemDelete = async function (id) {
      const newCart = document.value.cart.filter(
        (cartItem) => cartItem.id !== id
      );
      await updateDocument({ cart: newCart });
    };

    const handleCheckout = async function () {
      checkoutError.value = false;
      if (!document.value.cart.length) {
        checkoutError.value = true;
        return;
      }
      const merchant = document.value.cart[0].merchantId;
      cartPending.value = true;
      await addDocuments("orders", {
        merchantId: merchant,
        clientId: document.value.userId,
        order: document.value.cart,
        orderStatus: "pending",
        totalPrice: subTotal.value + offer.value,
      });
      await updateDocument({ cart: [] });
      cartPending.value = false;
      router.push({ name: "orders" });
    };

    return {
      document,
      subTotal,
      offer,
      handleItemDelete,
      isPending,
      handleCheckout,
      cartPending,
      checkoutError,
    };
  },
});
</script>

<style>
.cart-items-enter-from,
.cart-items-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.cart-items-enter-to,
.cart-items-leave-from {
  opacity: 1;
  transform: scale(1);
}
.cart-items-enter-active {
  transition: all 0.3s ease;
}

.cart-items-leave-active {
  position: absolute;
  z-index: -1;
}

.cart-items-move {
  transition: all 0.3s ease;
}
</style>
