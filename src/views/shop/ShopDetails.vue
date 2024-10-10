<template>
  <div class="container mt-5">
    <div class="row">
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <div v-if="!error && shop" class="col-lg-3">
        <img :src="shop.coverUrl" class="img-fluid rounded" alt="shop-cover" />
        <div class="shop-info">
          <span class="fw-bolder fs-1">{{ shop.shopTitle }}</span> <br />
          <span class="">Location: {{ shop.location }}</span> <br />
          <span class=""
            >Operating Hours: {{ shop.opHoursFrom }} -
            {{ shop.opHoursTo }}</span
          >
          <br />
          <span>phone: {{ shop.phoneNumber }}</span> <br />
          <span>Delivery fees: {{ shop.deliveryFees }}L.E</span>
        </div>
        <button
          class="btn btn-primary my-2 me-2"
          data-bs-toggle="modal"
          data-bs-target="#addItemModal"
          v-if="ownership"
        >
          Add item
        </button>
        <button class="btn btn-danger my-2" v-if="ownership">
          Delete Shop
        </button>

        <!-- modal -->
        <div
          class="modal fade"
          id="addItemModal"
          tabindex="-1"
          aria-labelledby="addItemLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addItemLabel">Add Item</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="alert alert-danger" v-if="addItemError">
                {{ addItemError }}
              </div>
              <div class="modal-body">
                <form @submit.enter.prevent="handleSubmit">
                  <div class="mb-3">
                    <label for="item-name" class="col-form-label"
                      >Item name:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="item-name"
                      v-model="itemTitle"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="item-pic" class="col-form-label"
                      >Item picture:</label
                    >
                    <input
                      type="file"
                      class="form-control"
                      id="item-pic"
                      @change="handleChange"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="item-price" class="col-form-label"
                      >Item price:</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="item-price"
                        v-model="itemPrice"
                        required
                      />
                      <span class="input-group-text">L.E</span>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="item-sale" class="col-form-label"
                      >Item sale:</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="item-sale"
                        v-model="itemSale"
                      />
                      <span class="input-group-text">L.E</span>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="description-text" class="col-form-label"
                      >Description:</label
                    >
                    <textarea
                      class="form-control"
                      id="description-text"
                      placeholder="add grasps of recipe"
                      v-model="itemDescription"
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click="handleSubmit"
                  class="btn btn-primary"
                  v-if="!isPending"
                >
                  Add Item to shop menu
                </button>
                <button
                  class="btn btn-primary me-2"
                  type="button"
                  v-if="isPending"
                  disabled
                >
                  <span
                    class="spinner-border spinner-border-sm me-1"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- menu items -->
      <div class="col">
        <ListShopMenu :shop="shop" :ownership="ownership" :id="id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import ListShopMenu from "@/components/ListShopMenu.vue";
import { ref } from "vue";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: { ListShopMenu },
  setup(props) {
    const itemTitle = ref<string>("");
    const itemCover = ref<FileList | string>("");
    const itemPrice = ref<string>("");
    const itemSale = ref<string>("");
    const itemDescription = ref<string>("");

    const { error, document: shop } = getDocument("shops", props.id);
    const { user } = getUser();
    const {
      error: addItemError,
      isPending,
      updateDocument,
    } = useDocument("shops", props.id);
    const { url, uploadImg } = useStorage();

    const ownership = computed(() => {
      return shop.value?.userId === user.value?.uid;
    });

    const handleChange = function (e: any) {
      itemCover.value = e.target.files[0];
    };

    const handleSubmit = async function () {
      isPending.value = true;

      await uploadImg(itemCover);

      const newMenuItem = {
        title: itemTitle.value,
        coverUrl: url.value,
        price: itemPrice.value,
        sale: itemSale.value,
        description: itemDescription.value,
        id: Math.floor(Math.random() * 1000000),
      };

      if (shop.value) {
        await updateDocument({ menu: [...shop.value?.menu, newMenuItem] });
      }

      isPending.value = false;
    };

    return {
      error,
      shop,
      ownership,
      itemTitle,
      itemPrice,
      itemSale,
      itemDescription,
      handleChange,
      handleSubmit,
      addItemError,
      isPending,
    };
  },
});
</script>

<style></style>
