<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <h3 class="fw-bold">Orders as merchant</h3>
        <div class="table-responsive">
          <table class="table mt-2" v-if="myMerchantOrders">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order Id</th>
                <th scope="col">Order details</th>
                <th scope="col">Total Price</th>
                <th scope="col">Order Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in myMerchantOrders" :key="order.id">
                <th scope="row">1</th>
                <td>{{ order.id }}</td>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Order Details
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="item in order.order" :key="item.id">
                        <div class="card mt-1">
                          <img
                            :src="item.coverUrl"
                            class="card-img img-fluid img-thumbnail"
                          />
                          <div class="cart-img-overlay">
                            <div class="cart-title fw-bolder">
                              {{ item.title }}
                            </div>
                            <div class="card-text">
                              Quantity: {{ item.quantity }}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{{ order.totalPrice }}EGP</td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="action btns"
                    v-if="order.orderStatus === 'pending'"
                  >
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="handleCancelOrder(order.id)"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-success"
                      @click="handleAcceptOrder(order.id)"
                    >
                      Accept
                    </button>
                  </div>
                  <button
                    class="btn btn-sm btn-warning"
                    v-if="order.orderStatus === 'Being prepared!'"
                    @click="handleFinishOrder(order.id)"
                  >
                    Finish order
                  </button>
                  <button
                    class="btn btn-sm btn-success"
                    v-if="order.orderStatus === 'completed ✅'"
                    disabled
                  >
                    {{ order.orderStatus }}
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    v-if="order.orderStatus === 'Canceled'"
                    disabled
                  >
                    order canceled by merchant
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- order as a client -->
    <div class="row mt-3">
      <div class="col">
        <h3 class="fw-bold">Orders as a client</h3>
        <div class="table-responsive">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order Id</th>
                <th scope="col">Order details</th>
                <th scope="col">Total Price</th>
                <th scope="col">Order Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in myClientOrders" :key="order.id">
                <th scope="row">1</th>
                <td>{{ order.id }}</td>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Order Details
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="item in order.order" :key="item.id">
                        <div class="card mt-1">
                          <img
                            :src="item.coverUrl"
                            class="card-img img-fluid img-thumbnail"
                          />
                          <div class="cart-img-overlay">
                            <div class="cart-title fw-bolder">
                              {{ item.title }}
                            </div>
                            <div class="card-text">
                              Quantity: {{ item.quantity }}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{{ order.totalPrice }}EGP</td>
                <td>{{ order.orderStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- order as a client end -->
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import getCollection from "@/composables/getCollection";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";

export default defineComponent({
  setup() {
    const { documents } = getCollection("orders");
    const { user } = getUser();

    const myMerchantOrders = computed(() => {
      return documents.value.filter(
        (order) => order.merchantId === user.value.uid
      );
    });

    const myClientOrders = computed(() => {
      return documents.value.filter(
        (order) => order.clientId === user.value.uid
      );
    });

    const handleCancelOrder = async function (orderId) {
      const { updateDocument } = useDocument("orders", orderId);
      await updateDocument({ orderStatus: "Canceled" });
    };

    const handleAcceptOrder = async function (orderId) {
      const { updateDocument } = useDocument("orders", orderId);
      await updateDocument({ orderStatus: "Being prepared!" });
    };

    const handleFinishOrder = async function (orderId) {
      const { updateDocument } = useDocument("orders", orderId);
      await updateDocument({ orderStatus: "completed ✅" });
    };

    return {
      myClientOrders,
      myMerchantOrders,
      handleCancelOrder,
      handleAcceptOrder,
      handleFinishOrder,
    };
  },
});
</script>

<style></style>
