<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3">
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
                    />
                    <label for="">Search by name</label>
                  </div>

                  <!-- food type -->
                  <div class="form-floating mt-2">
                    <select name="" class="form-select" id="">
                      <option value="fast food">Fast Food</option>
                      <option value="egyption">Egyption</option>
                      <option value="chinese">Chinese</option>
                      <option value="others">others</option>
                    </select>
                    <label for="">Food type</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- list shops -->
      <div class="col">
        <ListShops :shops="shops"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListShops from "@/components/ListShops.vue";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  components: { ListShops },
  setup() {
    const { error, documents: shops } = getCollection("shops");

    return { error, shops };
  },
});
</script>

<style></style>
