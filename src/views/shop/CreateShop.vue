<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <form
          class="form bg-light p-4 py-5 p-lg-5 rounded"
          @submit.enter.prevent="handleSubmit"
        >
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <h3>Create new shop</h3>
          <!-- shop-title -->
          <label class="form-label" for="shop-title">Shop title:</label>
          <div class="input-group">
            <span class="input-group-text">@</span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Abo Saleh"
              id="shop-title"
              v-model="title"
            />
            <span class="input-group-text">?</span>
          </div>

          <!-- shop logo -->
          <label class="form-label mt-2" for="logo">logo cover:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-image"></i></span>
            <input
              type="file"
              class="form-control"
              placeholder="e.g. 15L.E"
              id="logo"
              @change="handleLogoFile"
            />
          </div>

          <!-- shop-location -->
          <label class="form-label mt-2" for="location">Location:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-geo"></i></span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Cairo, Damietta, .."
              id="location"
              v-model="location"
            />
            <span class="input-group-text">?</span>
          </div>

          <!-- food-type -->
          <label class="form-label mt-2" for="type">Food Type:</label>
          <div class="input-group">
            <select class="form-select" v-model="foodType" id="type">
              <option value="fastFood">Fast Food</option>
              <option value="egyption">Egyption</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
              <option value="others">Others</option>
            </select>
            <span class="input-group-text">?</span>
          </div>

          <!-- phone-number -->
          <label class="form-label mt-2" for="number">Phone number:</label>
          <div class="input-group">
            <span class="input-group-text"
              ><i class="bi bi-telephone"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. 01111111111"
              id="number"
              v-model="phoneNumber"
            />
            <span class="input-group-text">?</span>
          </div>

          <!-- Operating-Hours  -->
          <label class="form-label mt-2">Operating Hours:</label>
          <div class="d-flex justify-content-around">
            <div class="form-floating">
              <input
                type="time"
                class="form-control"
                placeholder="From"
                v-model="opHoursFrom"
              />
              <label for="">From</label>
            </div>
            <div class="form-floating">
              <input
                type="time"
                class="form-control"
                placeholder="To"
                v-model="opHoursTo"
              />
              <label for="">To</label>
            </div>
          </div>

          <!-- Delivery fees -->
          <label class="form-label mt-2" for="delivery-fees"
            >Delivery fees:</label
          >
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-cash"></i></span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. 15L.E"
              id="delivery-fees"
              v-model="deliveryFees"
            />
            <span class="input-group-text">L.E</span>
          </div>

          <!-- terms and conditions -->
          <div class="form-check mt-2">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              v-model="terms"
            />
            <label class="form-check-label" for="flexCheckChecked">
              <span>Terms and conditions</span>
            </label>
          </div>
          <button class="btn btn-success mt-4" v-if="!isPending">
            Create Shop
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
            <span role="status">Loading...</span>
          </button>
        </form>
      </div>

      <!-- Demo -->
      <div class="col-lg-5" v-if="showPreview()">
        <h3>See how will your shop look like!</h3>
        <transition name="card-list">
          <div class="card shadow" style="width: 18rem">
            <img
              src="@/assets/6306486.jpg"
              class="card-img-top img-fluid"
              alt="logo-cover"
            />
            <div class="card-body">
              <h5 class="card-title">{{ title }}</h5>
              <div class="card-text">
                <div>
                  <span class="align-items-center">
                    <h6>
                      {{ location }}
                      <span class="badge text-bg-danger m-0">{{
                        foodType
                      }}</span>
                    </h6>
                  </span>
                  <span class="text-muted"
                    >{{ opHoursFrom }} - {{ opHoursTo }}</span
                  >
                  <br />
                  <span class="align-items-center">
                    <h6>
                      <span class="badge text-bg-success m-0">Working..</span>
                    </h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCollection from "@/composables/useCollection";
import { serverTimestamp } from "firebase/firestore";
import getUser from "@/composables/getUser";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const title = ref<string>("");
    const logo = ref<FileList | string>("");
    const location = ref<string>("");
    const foodType = ref<string>("");
    const phoneNumber = ref<string>("");
    const opHoursFrom = ref<string>("");
    const opHoursTo = ref<string>("");
    const deliveryFees = ref<string>("");
    const terms = ref<boolean>(false);

    const { error, isPending, addDocuments } = useCollection();
    const { url, uploadImg } = useStorage();
    const { user } = getUser();
    const router = useRouter();

    const handleSubmit = async function () {
      if (!user.value) return;
      isPending.value = true;
      await uploadImg(logo);
      const newShop = await addDocuments("shops", {
        coverUrl: url.value,
        shopTitle: title.value,
        location: location.value,
        foodType: foodType.value,
        phoneNumber: phoneNumber.value,
        opHoursFrom: opHoursFrom.value,
        opHoursTo: opHoursTo.value,
        deliveryFees: deliveryFees.value,
        createdAt: serverTimestamp(),
        userId: user.value.uid,
        isOpened: true,
        menu: [],
      });
      isPending.value = false;
      router.push({ name: "shopDetails", params: { id: newShop?.id } });
    };

    const handleLogoFile = function (e: any) {
      logo.value = e.target.files[0];
    };

    const showPreview = function () {
      if (
        title.value ||
        location.value ||
        foodType.value ||
        opHoursFrom.value ||
        opHoursTo.value
      ) {
        return true;
      }
    };

    return {
      title,
      logo,
      location,
      foodType,
      phoneNumber,
      opHoursFrom,
      opHoursTo,
      deliveryFees,
      terms,
      handleLogoFile,
      showPreview,
      handleSubmit,
      error,
      isPending,
    };
  },
});
</script>

<style></style>
