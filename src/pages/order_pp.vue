<script>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../apiService';
import FilterRadios from '@/components/filterRadios.vue'
import SearchForm from '@/components/searchForm.vue'
import FilterDropdownOrder from '@/components/filterDropdownOrder.vue'


export default {
  name: 'order_pp',
  components: {
    FilterDropdownOrder,
    SearchForm,
    FilterRadios
  },

  setup() {
    const localOrders = ref([]);
    const searchFilter = ref('');
    const radioFilter = ref('');
    const statusFilter = ref([]);
    const pageSize = ref(5);
    const currentPage = ref(1);

    onMounted(async () => {
      try {
        const response = await apiService.get('order');
        localOrders.value = response.data;
        console.log('Orders loaded:', localOrders.value);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    });


    function formatDate(date) {
      if (!date) return 'N/A';
      const dt = new Date(date);
      return dt.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    function formatTime(time) {
      if (!time) return 'N/A';

      const parts = time.split(':');
      if (parts.length < 2) return 'Invalid time format';

      const formattedTime = parts[0] + ':' + parts[1];
      return formattedTime;
    }

    const filteredItems = computed(() => {
      let filtered = localOrders.value;

      if (searchFilter.value) {
        filtered = filtered.filter(order =>
          order.user.name.toLowerCase().includes(searchFilter.value.toLowerCase())
        );
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (radioFilter.value === 'today') {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.data);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() === today.getTime();
        });
      } else if (radioFilter.value === 'past') {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.data);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() < today.getTime();
        });
      }

      if (statusFilter.value.length > 0) {
        filtered = filtered.filter(order => statusFilter.value.includes(order.status.toString()));
      }

      return filtered;
    });

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredItems.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / pageSize.value);
    });

    const handleSearch = (search) => {
      searchFilter.value = search;
    };

    const handleRadioFilter = (filter) => {
      radioFilter.value = filter;
    };

    const handleStatusFilter = (statuses) => {
      statusFilter.value = statuses;
      console.log('Обновленный statusFilter:', statusFilter.value);
    };

    const getOrderStatus = (order) => {
      switch (order.status) {
        case 1:
          return 'В процессе';
        case 2:
          return 'Готов';
        default:
          return 'Создан';
      }
    };

    return {
      paginatedItems,
      filteredItems,
      handleSearch,
      handleRadioFilter,
      handleStatusFilter,
      currentPage,
      totalPages,
      formatDate,
      getOrderStatus,
      formatTime
    };
  }
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between px-4 py-3">
      <filter-radios @filter="handleRadioFilter"/>
      <search-form @search="handleSearch"/>
      <filter-dropdown-order @status-filter="handleStatusFilter"/>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">ID</th>
        <th scope="col" class="px-6 py-3">Имя</th>
        <th scope="col" class="px-6 py-3">Телефон</th>
        <th scope="col" class="px-6 py-3">Дата</th>
        <th scope="col" class="px-6 py-3">Время</th>
        <th scope="col" class="px-6 py-3">Машина</th>
        <th scope="col" class="px-6 py-3">Комментарий</th>
        <th scope="col" class="px-6 py-3">Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in paginatedItems" :key="order.id" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-700">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label :for="'checkbox-' + order.id" class="sr-only">checkbox</label>
          </div>
        </td>
        <td class="px-6 py-4 font-medium">{{ order.id }}</td>
        <td class="px-6 py-4 font-medium">{{ order.user.name || 'N/A' }}</td>
        <td class="px-6 py-4">{{ order.user.phone || 'N/A' }}</td>
        <td class="px-6 py-4">{{ formatDate(order.date)}}</td>
        <td class="px-6 py-4">{{ formatTime(order.time) || 'N/A'}}</td>
        <td class="px-6 py-4">{{ order.car || 'N/A' }}</td>
        <td class="px-6 py-4">{{ order.user.comment || 'N/A' }}</td>
        <td class="px-6 py-4">{{ getOrderStatus(order) }}</td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center p-4">
      <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">Предыдущая</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage >= totalPages">Следующая</button>
    </div>
  </div>
</template>

<style scoped>

</style>
