<template>
  <search-form @search="handleSearch"/>
  <add-detail></add-detail>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3 th-id">ID</th>
        <th scope="col" class="px-6 py-3 th-name">Название</th>
        <th scope="col" class="px-6 py-3 th-description">Описание</th>
        <th scope="col" class="px-6 py-3 th-cost">Стоимость</th>
        <th scope="col" class="px-6 py-3 th-quantity">Количество</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="detail in filteredItems" :key="detail.id" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-700">
        <td class="px-6 py-4 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{{ detail.id }}</td>
        <td class="px-6 py-4 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{{ detail.name || 'N/A' }}</td>
        <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ detail.description || 'N/A' }}</td>
        <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ detail.cost || 'N/A' }}</td>
        <td class="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ detail.quantity_detail || 'N/A' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import apiService from '../../apiService';
import { computed, onMounted, ref } from 'vue'
import AddDetail from '@/components/addDetail.vue'
import SearchForm from '@/components/searchForm.vue'

export default {
  name: 'DetailPp',
  components: { SearchForm, AddDetail, },
  setup() {
    const details = ref([]);
    const searchFilter = ref('');


    onMounted(async () => {
      try {
        const response = await apiService.get('/detail');
        details.value = response.data;
        console.log('Details loaded:', details.value);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    });

    const filteredItems = computed(() => {
      let filtered = details.value;

      if (searchFilter.value) {
        filtered = filtered.filter(user =>
          user.name && user.name.toLowerCase().includes(searchFilter.value.toLowerCase())
        );
      }
      return filtered;
    });

    const handleSearch = (search) => {
      searchFilter.value = search;
    };

    return {
      details,
      filteredItems,
      handleSearch
    };
  }
}
</script>


<style scoped>
.th-id, .th-name, .th-cost, .th-quantity {
  width: 10%;
}

.th-description {
  width: 60%;
}
</style>


<style scoped>
.th-id, .th-name, .th-cost, .th-quantity {
  width: 10%;
}

.th-description {
  width: 40%;
}
</style>