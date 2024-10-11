<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3 mt-3">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Filters
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <form>
                  <!-- search bar -->
                  <div class="form-floating">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control"
                      placeholder="Search by name"
                      v-model="searchBar"
                    />
                    <label for="">Search by name</label>
                  </div>

                  <!-- food type -->
                  <div class="form-floating mt-2">
                    <select
                      name=""
                      class="form-select"
                      v-model="foodType"
                      id=""
                    >
                      <option value="fastFood">Fast Food</option>
                      <option value="egyption">Egyption</option>
                      <option value="chinese">Chinese</option>
                      <option value="others">others</option>
                    </select>
                    <label for="">Food type</label>
                  </div>
                  <button
                    class="btn btn-outline-secondary btn-sm mt-2"
                    @click.prevent="handleClearFilters"
                  >
                    Clear
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- list shops -->
      <div class="col">
        <ListShops :shops="searchResults" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ListShops from "@/components/ListShops.vue";
import getCollection from "@/composables/getCollection";
import { ref } from "vue";
import Shop from "@/types/shop";

export default defineComponent({
  components: { ListShops },
  setup() {
    const { error, documents: shops } = getCollection("shops");
    const searchBar = ref<string>("");
    const foodType = ref<string>("");

    let searchResults = computed(() => {
      return shops.value.filter((shop: Shop) => {
        const matchesSearch = searchBar.value
          ? shop.shopTitle.toLowerCase().includes(searchBar.value.toLowerCase())
          : true;
        const matchesFoodType = foodType.value
          ? shop.foodType.toLowerCase() === foodType.value.toLowerCase()
          : true;

        return matchesSearch && matchesFoodType;
      });
    });

    const handleClearFilters = function () {
      searchBar.value = "";
      foodType.value = "";
    };

    return {
      error,
      shops,
      searchResults,
      searchBar,
      foodType,
      handleClearFilters,
    };
  },
});
</script>

<style></style>
