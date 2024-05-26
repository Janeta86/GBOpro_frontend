<script>
import { ref, onMounted, computed, toRefs } from 'vue';
import apiService from '../../apiService';
import EditUser from '@/components/EditUser.vue';
import editOrder from '@/components/editOrder.vue';
import AddOrderDetail from '@/components/addOrderDetail.vue'

export default {
  components: { AddOrderDetail, EditUser, editOrder },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { id } = toRefs(props);
    const numericId = ref(Number(id.value));
    const userDetails = ref({});
    const userOrders = ref({});

    onMounted(async () => {
      await fetchUserDetails(numericId.value);
      await fetchOrders(numericId.value);
      await fetchOrderDetails(numericId.value);
    });

    const fetchUserDetails = async (id) => {
      try {
        const response = await apiService.get(`user/${id}`);
        console.log("Полученные данные пользователя:", response.data);
        userDetails.value = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    const fetchOrders = async () => {
      const url = `order/user/${props.id}`;
      console.log(`Fetching order from URL: ${url}`);
      try {
        const response = await apiService.get(url);
        userOrders.value = response.data;
        for (let order of userOrders.value) {
          order.details = await fetchOrderDetails(order.id);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    const fetchOrderDetails = async (orderId) => {
      const url = `orderdetail/order/${orderId}`;
      console.log(`Fetching details from URL: ${url}`);
      try {
        const response = await apiService.get(url);
        console.log("Order details fetched:", response.data);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch order details for order ID ${orderId}:`, error.response || error);
        return [];
      }
    };

    const roleName = computed(() => {
      switch (userDetails.value.role) {
        case 1:
          return 'Администратор';
        case 2:
          return 'Мастер';
        default:
          return 'Пользователь';
      }
    });
    const getOrderStatus = (order) => {
      switch (order.status) {
        case 1: return 'В процессе';
        case 2: return 'Готов';
        default: return 'Создан';
      }
    };

    const handleOrderUpdated = (updatedOrder) => {
      const index = userOrders.value.findIndex(order => order.id === updatedOrder.id);
      if (index !== -1) {
        userOrders.value[index] = updatedOrder;
        console.log('Заказ обновлён:', userOrders.value[index]);
      } else {
        console.log('Заказ не найден в массиве');
      }
    };

    function formatDate(date) {
      if (!date) return 'N/A';
      const dt = new Date(date);
      return dt.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    function formatTime(time) {
      if (!time) return 'N/A';

      const parts = time.split(':');
      if (parts.length < 2) return 'Invalid time format';

      const formattedTime = parts[0] + ':' + parts[1];
      return formattedTime;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      userDetails,
      userOrders,
      roleName,
      formatDate,
      getOrderStatus,
      handleOrderUpdated,
      formatTime };
  }
};
</script>

<template>
  <div v-for="order in userOrders" :key="order.id">
    <add-order-detail :orderId="order.id"></add-order-detail>
  </div>
  <div class="container mx-auto p-4">
    <div class="bg-white shadow rounded-lg p-6 relative">
      <edit-user :id="Number(id)" @orderUpdated="getOrderStatus"></edit-user>
      <h1 class="text-2xl font-bold mb-4">Детали пользователя</h1>
      <ul class="list-none space-y-2">
        <li>Имя: <span class="font-medium">{{ userDetails.name || 'N/A' }}</span></li>
        <li>Телефон: <span class="font-medium">{{ userDetails.phone || 'N/A' }}</span></li>
        <li>Email: <span class="font-medium">{{ userDetails.email || 'N/A' }}</span></li>
        <li>Комментарий: <span class="font-medium">{{ userDetails.comment || 'N/A' }}</span></li>
        <li>Роль: <span class="font-medium">{{ roleName }}</span></li>
        <li>Дата создания: <span class="font-medium">{{ userDetails.createdAt ? formatDate(userDetails.createdAt) : 'N/A' }}</span></li>
        <li>Дата обновления: <span class="font-medium">{{ userDetails.updatedAt ? formatDate(userDetails.updatedAt) : 'N/A' }}</span></li>
      </ul>
    </div>

    <div v-for="order in userOrders" :key="order.id" class="bg-white shadow rounded-lg p-6 mt-5 mb-4 relative">
      <edit-order :order-id="order.id" @orderUpdated="handleOrderUpdated"></edit-order>
      <h1 class="text-2xl font-bold mt-6 mb-2">Заказы</h1>
      <h3 class="font-bold text-lg">Заказ ID: {{ order.id }}</h3>
      <ul class="list-none space-y-1">
        <li>Дата заказа: <span class="font-medium">{{ formatDate(order.date) }}</span></li>
        <li>Время заказа: <span class="font-medium">{{ formatTime(order.time) }}</span></li>
        <li>Машина: <span class="font-medium">{{ order.car || 'N/A' }}</span></li>
        <li>Статус: <span class="font-medium">{{ getOrderStatus(order) }}</span></li>
        <li>Исполнитель ID: <span class="font-medium">{{ order.id_executer || 'N/A' }}</span></li>
        <h4 class="font-bold mt-2">Детали заказа:</h4>
        <div v-if="order.details && order.details.length">
          <ul class="list-none space-y-1">
            <li v-for="detail in order.details" :key="detail.id" class="order-detail">
              Название: <span class="font-medium">{{ detail.detail.name }}</span>,
              Описание: <span class="font-medium">{{ detail.detail.description }}</span>,
              Стоимость: <span class="font-medium">{{ detail.detail.cost }}</span>,
              Количество: <span class="font-medium">{{ detail.quantity }}</span>
            </li>
          </ul>
        </div>
        <p v-else>Детали заказа не найдены.</p>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.user-details ul {
  list-style-type: none;
}

.order-detail {
  margin-bottom: 8px;
}
</style>