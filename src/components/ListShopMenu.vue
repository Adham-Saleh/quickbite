<template>
  <div class="container text-center" v-if="!shop">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="container" v-if="shop">
    <div class="row text-center" v-if="!shop.menu.length">
      <span><i class="bi bi-emoji-frown-fill"></i></span>
      <h4>No menu items available</h4>
    </div>
    <div class="row" v-else>
      <h3 class="fw-bolder d-flex">
        <span class="me-2">Menu</span>
        <div class="spinner-border text-primary" v-if="isPending" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </h3>
      <div
        class="col-xl-4 col-lg-5 col-md-6 mt-5 mt-lg-0 d-flex justify-content-center d-lg-block"
        v-for="item in shop.menu"
        :key="item.title"
      >
        <div class="card shadow" style="width: 18rem">
          <img
            :src="item.coverUrl ? item.coverUrl : shop.coverUrl"
            class="card-img-top img-fluid"
            alt="logo-cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <div class="card-text">
              <div>
                <span class="align-items-center" v-if="item.sale">
                  <h6>
                    <span class="badge text-bg-danger me-2">On sale</span>
                    <span class="badge text-bg-danger me-2"
                      >{{ ((+item.sale / +item.price) * 100).toFixed(2) }}%
                      OFF</span
                    >
                  </h6>
                </span>
                <span class="align-items-center">
                  <p>{{ item.description }}</p>
                </span>
                <span class="text-muted fw-bolder"
                  >{{ item.price - (item.sale ? item.sale : 0) }}EGP
                  <span
                    class="text-decoration-line-through text-danger"
                    v-if="item.sale"
                    >{{ item.price }}EGP</span
                  ></span
                >
                <br />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-12">
                <div class="input-group" v-if="!ownership">
                  <button class="btn btn-light" @click="decrement(item.id)">
                    <i class="bi bi-dash"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control text-center"
                    value="1"
                    :id="item.id"
                  />
                  <button class="btn btn-light" @click="increment(item.id)">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-12 mt-2">
                <button
                  class="btn btn-success w-100"
                  v-if="!ownership"
                  @click="handleAddToCart(item)"
                >
                  Add to cart
                </button>
                <button
                  class="btn btn-danger w-100"
                  @click="handleDelete(item.id)"
                  v-if="ownership"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { defineComponent } from "vue";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import Shop from "@/types/shop";

export default defineComponent({
  props: {
    shop: {
      required: true,
      type: Shop,
    },
    id: {
      required: true,
    },
    ownership: {
      required: true,
      type: Boolean,
    },
  },
  setup(props) {
    const itemAmount = ref(1);
    const { isPending, updateDocument } = useDocument("shops", props.id);
    const { documents } = getCollection("users");
    const { user } = getUser();

    const userDocument = computed(() =>
      documents.value.filter((document) => document.userId === user.value.uid)
    );

    const increment = function (id) {
      const targtedInput = document.getElementById(id);
      +targtedInput.value++;
    };
    const decrement = function (id) {
      const targtedInput = document.getElementById(id);
      if (!(targtedInput.value > 1)) return;
      +targtedInput.value--;
    };

    const handleDelete = async function (id) {
      const newMenu = props.shop.menu.filter((item) => item.id !== id);
      await updateDocument({ menu: newMenu });
    };

    const handleAddToCart = async function (item) {
      // add item to userDocument.id Cart
      const { updateDocument: updateUserCart } = useDocument(
        "users",
        userDocument.value[0].id
      );
      const targtedInput = document.getElementById(item.id);
      const newItem = { ...item, quantity: targtedInput.value, merchantId: props.shop.userId };
      await updateUserCart({ cart: [...userDocument.value[0].cart, newItem] });
    };

    return {
      itemAmount,
      increment,
      decrement,
      handleDelete,
      isPending,
      handleAddToCart,
    };
  },
});
</script>

<style></style>
