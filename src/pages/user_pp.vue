<script>
import { ref, onMounted, computed } from 'vue';
import apiService from '../../apiService';
import SearchForm from '@/components/searchForm.vue';
import FilterDropdown from '@/components/filterDropdown.vue';
import FilterRadios from '@/components/filterRadios.vue';
import AddUser from '@/components/addUser.vue'

export default {
  name: 'user_pp',
  components: {
    FilterRadios,
    FilterDropdown,
    SearchForm,
    'add-user': AddUser
  },

  setup() {
    const localUsers = ref([]);
    const searchFilter = ref('');
    const radioFilter = ref('');
    const roleFilter = ref([]);
    const pageSize = ref(5);
    const currentPage = ref(1);

    onMounted(async () => {
      try {
        const response = await apiService.get('user');
        if (response.data.every(user => user.role !== undefined)) {
          localUsers.value = response.data;
        } else {
          console.error('Role data is missing in some user objects');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });

    const filteredItems = computed(() => {
        let filtered = localUsers.value;

        if (searchFilter.value) {
          filtered = filtered.filter(user =>
            user.name && user.name.toLowerCase().includes(searchFilter.value.toLowerCase())
          );
        }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (radioFilter.value === 'today') {
        filtered = filtered.filter(user => {
          const userDate = new Date(user.createdAt);
          userDate.setHours(0, 0, 0, 0);
          return userDate.getTime() === today.getTime();
        });
      } else if (radioFilter.value === 'past') {
        filtered = filtered.filter(user => {
          const userDate = new Date(user.createdAt);
          userDate.setHours(0, 0, 0, 0);
          return userDate.getTime() < today.getTime();
        });
      }

      if (roleFilter.value.length > 0) {
        filtered = filtered.filter(user => roleFilter.value.includes(user.role.toString()));
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

    const handleRoleFilter = (roles) => {
      roleFilter.value = roles;
    };

    return {
      paginatedItems,
      filteredItems,
      handleSearch,
      handleRadioFilter,
      handleRoleFilter,
      currentPage,
      totalPages
    };
  }
};
</script>

<template>
  <add-user class="z-100 relative"></add-user>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between px-4 py-3">

        <filter-radios @filter="handleRadioFilter"/>
        <search-form @search="handleSearch"/>
      <filter-dropdown @roles-filter="handleRoleFilter"/>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">ID</th>
        <th scope="col" class="px-6 py-3">Имя</th>
        <th scope="col" class="px-6 py-3">Email</th>
        <th scope="col" class="px-6 py-3">Телефон</th>
        <th scope="col" class="px-6 py-3">Комментарий</th>
        <th scope="col" class="px-6 py-3">Дата создания</th>
        <th scope="col" class="px-6 py-3">Дата обновления</th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Детали</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in paginatedItems" :key="user.id"
          class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-700">
        <td class="px-6 py-4 font-medium">{{ user.id }}</td>
        <td class="px-6 py-4 font-medium">{{ user.name || 'N/A' }}</td>
        <td class="px-6 py-4">{{ user.email }}</td>
        <td class="px-6 py-4">{{ user.phone || 'N/A' }}</td>
        <td class="px-6 py-4">{{ user.comment || 'N/A' }}</td>
        <td class="px-6 py-4"> {{ user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A' }}</td>
        <td class="px-6 py-4">{{ user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A' }}</td>
        <td class="px-6 py-4 flex items-center justify-end">
          <div class="text-indigo-500 hover:underline">
          <router-link :to="{ name: 'UserDetails', params: { id: user.id }} ">Детали</router-link>
          </div>
        </td>
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