<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['roles-filter']);
const showDropdown = ref(false);

const roles = [
  { label: 'Пользователь', value: '0' },
  { label: 'Администратор', value: '1' },
  { label: 'Мастер', value: '2' }
];

const roleFilter = ref([]);

// function toggleRole(role) {
//   const index = roleFilter.value.indexOf(role.value);
//   if (index > -1) {
//     roleFilter.value.splice(index, 1);
//   } else {
//     roleFilter.value.push(role.value);
//   }
//   emit('roles-filter', roleFilter.value);
// }
function toggleRole(role) {
  const roleValue = role.value; // Убедитесь, что значение корректно передается
  const index = roleFilter.value.indexOf(roleValue);
  if (index > -1) {
    roleFilter.value.splice(index, 1);  // Если роль уже выбрана, удаляем её
  } else {
    roleFilter.value.push(roleValue);  // Иначе добавляем роль в фильтр
  }
  emit('roles-filter', roleFilter.value);
  console.log('Updated roleFilter:', roleFilter.value); // Проверяем, что фильтр обновляется правильно
}
// function toggleRole(role) {
//   emit('roles-filter', role.value);
// }
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="showDropdown = !showDropdown" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Фильтр
        <svg class="ml-2 -mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <div v-if="showDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
      <h6 class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-200">
        Роли
      </h6>
      <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
        <li v-for="role in roles" :key="role.value">
          <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input :id="`checkbox-item-${role.value}`" type="checkbox" :value="role.value"
                   @change="() => toggleRole(role)"
                   :checked="roleFilter.value && roleFilter.value.includes(role.value)"
                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
            <label :for="`checkbox-item-${role.value}`" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              {{ role.label }}
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
