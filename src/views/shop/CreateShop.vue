<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <transition-group name="move-items" appear>
        <div class="col-lg-5">
          <form
            class="form bg-light p-4 py-5 p-lg-5 rounded"
            @submit.enter.prevent="submit"
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
                v-bind="title"
              />
              <span class="input-group-text">?</span>
            </div>
            <div v-if="getError('title')" class="text-danger">
              {{ getError("title") }}
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
            <div v-if="getError('logo')" class="text-danger">
              {{ getError("logo") }}
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
                v-bind="location"
              />
              <span class="input-group-text">?</span>
            </div>
            <div v-if="getError('location')" class="text-danger">
              {{ getError("location") }}
            </div>

            <!-- food-type -->
            <label class="form-label mt-2" for="type">Food Type:</label>
            <div class="input-group">
              <select class="form-select" v-bind="foodType" id="type">
                <option value="fastFood">Fast Food</option>
                <option value="egyption">Egyption</option>
                <option value="italian">Italian</option>
                <option value="chinese">Chinese</option>
                <option value="others">Others</option>
              </select>
              <span class="input-group-text">?</span>
            </div>
            <div v-if="getError('foodType')" class="text-danger">
              {{ getError("foodType") }}
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
                v-bind="phoneNumber"
              />
              <span class="input-group-text">?</span>
            </div>
            <div v-if="getError('phoneNumber')" class="text-danger">
              {{ getError("phoneNumber") }}
            </div>

            <!-- Operating-Hours  -->
            <label class="form-label mt-2">Operating Hours:</label>
            <div class="d-flex justify-content-around">
              <div class="form-floating">
                <input
                  type="time"
                  class="form-control"
                  placeholder="From"
                  v-bind="opHoursFrom"
                />
                <label for="">From</label>
                <div v-if="getError('opHoursFrom')" class="text-danger">
                  {{ getError("opHoursFrom") }}
                </div>
              </div>
              <div class="form-floating">
                <input
                  type="time"
                  class="form-control"
                  placeholder="To"
                  v-bind="opHoursTo"
                />
                <label for="">To</label>
                <div v-if="getError('opHoursTo')" class="text-danger">
                  {{ getError("opHoursTo") }}
                </div>
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
                v-bind="deliveryFees"
              />
              <span class="input-group-text">L.E</span>
            </div>
            <div v-if="getError('deliveryFees')" class="text-danger">
              {{ getError("deliveryFees") }}
            </div>

            <!-- terms and conditions -->
            <div class="form-check mt-2">
              <input
                name="terms"
                class="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
              />
              <label class="form-check-label" for="flexCheckChecked">
                <span>Terms and conditions</span>
              </label>
              <div v-if="getError('terms')" class="text-danger">
                {{ getError("terms") }}
              </div>
            </div>
            <button
              class="btn btn-success mt-4"
              type="submit"
              v-if="!isPending"
            >
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
          <div class="card shadow" style="width: 18rem">
            <img
              src="@/assets/6306486.jpg"
              class="card-img-top img-fluid"
              alt="logo-cover"
            />
            <div class="card-body">
              <h5 class="card-title">{{ values.title }}</h5>
              <div class="card-text">
                <div>
                  <span class="align-items-center">
                    <h6>
                      {{ values.location }}
                      <span class="badge text-bg-danger m-0">{{
                        values.foodType
                      }}</span>
                    </h6>
                  </span>
                  <span class="text-muted"
                    >{{ values.opHoursFrom }} - {{ values.opHoursTo }}</span
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
        </div>
      </transition-group>
      <!-- ended -->
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
import { useForm, Field } from "vee-validate";
import { string, object, number } from "yup";

export default defineComponent({
  setup() {
    const logo = ref<FileList | string>("");

    const shopDetailsSchema = object({
      title: string().required("Field is required"),
      location: string().required("Field is required"),
      foodType: string().required("Field is required"),
      phoneNumber: number()
        .typeError("invalid phone number")
        .required("Field is required")
        .min(11, "please enter a valid egyption number"),
      opHoursFrom: string().required("Field is required"),
      opHoursTo: string().required("Field is required"),
      deliveryFees: number()
        .required("Field is required")
        .typeError("invalid delivery fees"),
    });

    const { defineInputBinds, values, errorBag, handleSubmit } = useForm({
      validationSchema: shopDetailsSchema,
    });

    const title = defineInputBinds("title");
    const location = defineInputBinds("location");
    const foodType = defineInputBinds("foodType");
    const phoneNumber = defineInputBinds("phoneNumber");
    const opHoursFrom = defineInputBinds("opHoursFrom");
    const opHoursTo = defineInputBinds("opHoursTo");
    const deliveryFees = defineInputBinds("deliveryFees");

    const { error, isPending, addDocuments } = useCollection();
    const { url, uploadImg } = useStorage();
    const { user } = getUser();
    const router = useRouter();

    const submit = handleSubmit(async function () {
      if (!user.value) return;
      isPending.value = true;
      if (logo.value) await uploadImg(logo);
      const newShop = await addDocuments("shops", {
        coverUrl: url.value || '',
        shopTitle: values.title,
        location: values.location,
        foodType: values.foodType,
        phoneNumber: values.phoneNumber,
        opHoursFrom: values.opHoursFrom,
        opHoursTo: values.opHoursTo,
        deliveryFees: values.deliveryFees,
        createdAt: serverTimestamp(),
        userId: user.value.uid,
        isOpened: true,
        menu: [],
      });
      isPending.value = false;
      router.push({ name: "shopDetails", params: { id: newShop?.id } });
    });

    const getError = function (name: string) {
      const err = errorBag.value[name];
      return err ? err[0] : false;
    };

    const handleLogoFile = function (e: any) {
      logo.value = e.target.files[0];
    };

    const showPreview = function () {
      if (
        values.title ||
        values.location ||
        values.foodType ||
        values.opHoursFrom ||
        values.opHoursTo
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

      handleLogoFile,
      showPreview,
      submit,
      error,
      isPending,
      getError,
      values,
      Field
    };
  },
});
</script>

<style>
.move-items-enter-from,
.move-items-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.move-items-enter-to,
.move-items-leave-from {
  opacity: 1;
  transform: scale(1);
}
.move-items-enter-active {
  transition: all 0.3s ease;
}

.move-items-leave-active {
  position: absolute;
  z-index: -1;
}

.move-items-move {
  transition: all 0.3s ease;
}
</style>
