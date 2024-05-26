<script>
import { ref, onMounted } from 'vue';
import apiService from '../../apiService';
import AddDataTime from '@/components/addDataTime.vue'

export default {
  components: { AddDataTime },
  setup() {
    const allAvailableTimes = ref([]);

    onMounted(async () => {
      try {
        const response = await apiService.get('available');
        allAvailableTimes.value = response.data;
      } catch (error) {
        console.error('Error fetching available times:', error);
      }
    });

    const removeTime = async (index) => {
      const id = allAvailableTimes.value[index].id;
      if (id) {
        try {
          await apiService.delete(`available/${id}`);
          allAvailableTimes.value = allAvailableTimes.value.filter((time) => time.id !== id);
        } catch (error) {
          console.error('Error deleting available time:', error);
        }
      } else {
        console.error('Invalid ID:', id);
      }
    };

    return {
      allAvailableTimes,
      removeTime,
    };
  }
};
</script>

<template>
  <div>
    <add-data-time></add-data-time>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">ID</th>
        <th scope="col" class="px-6 py-3">Дата</th>
        <th scope="col" class="px-6 py-3">Время</th>
        <th scope="col" class="px-6 py-3">Исполнитель</th>
        <th scope="col" class="px-6 py-3">Доступ</th>
        <th scope="col" class="px-6 py-3">Дата создания</th>
        <th scope="col" class="px-6 py-3">Дата обновления</th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Детали</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(available, index) in allAvailableTimes" :key="available.id"
          class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-700">
        <td class="px-6 py-4 font-medium">{{ available.id }}</td>
        <td class="px-6 py-4 font-medium">{{ available.date || 'N/A' }}</td>
        <td class="px-6 py-4">{{ available.time || 'N/A'}}</td>
        <td class="px-6 py-4">{{ available.executerId || 'N/A' }}</td>
        <td class="px-6 py-4">{{ available.isAvailable ? 'Свободно' : 'Занято' }}</td>
        <td class="px-6 py-4"> {{ available.createdAt ? new Date(available.createdAt).toLocaleString() : 'N/A' }}</td>
        <td class="px-6 py-4">{{ available.updatedAt ? new Date(available.updatedAt).toLocaleString() : 'N/A' }}</td>
        <td class="px-4 py-2">
          <button class="send-button" @click="removeTime(index)">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.send-button {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #ff8c01;
  color: #ffffff;
  border-radius: 0.25rem;
  transition: background-color 0.4s ease;
}

.send-button:hover {
  background-color: #ffc732;
}
</style>