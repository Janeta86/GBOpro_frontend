<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['status-filter']);
const showDropdown = ref(false);

const statuses = [
  { label: 'Создан', value: '0' },
  { label: 'В процессе', value: '1' },
  { label: 'Готов', value: '2' }
];
const selectedStatuses = ref([]);

function toggleStatus(status) {
  const index = selectedStatuses.value.indexOf(status.value);
  if (index > -1) {
    selectedStatuses.value.splice(index, 1);
  } else {
    selectedStatuses.value.push(status.value);
  }
  emit('status-filter', selectedStatuses.value); // Правильно передаём массив статусов
}
</script>


<template>
  <div class="relative inline-block text-left">
    <button @click="showDropdown = !showDropdown" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
      Фильтр
      <svg class="ml-2 -mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="showDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
      <h6 class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-200">
        Статус заказа
      </h6>
      <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="status in statuses" :key="status.value">
          <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input :id="`checkbox-status-${status.value}`" type="checkbox" :value="status.value"
                   @change="() => toggleStatus(status)"
                   :checked="selectedStatuses.value && selectedStatuses.value.includes(status.value)"
                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
            <label :for="`checkbox-status-${status.value}`" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              {{ status.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
/* Optionally add custom CSS or utility classes */
</style>
