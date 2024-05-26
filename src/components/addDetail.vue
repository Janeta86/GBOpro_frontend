<script setup>
import { ref } from 'vue';
import ApiService from '../../apiService.js';

const isModalOpen = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const newDetail = ref({
  name: '',
  description: '',
  cost: 0,
  quantity_detail: 0
});

function openAddDetailModal() {
  isModalOpen.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  newDetail.value = { name: '', description: '', cost: 0, quantity_detail: 0 };
}

async function addDetail() {
  try {
    await ApiService.post('/detail', newDetail.value);
    successMessage.value = 'Деталь успешно добавлена.';
    errorMessage.value = '';
    setTimeout(() => {
      isModalOpen.value = false; // Close modal after showing success message
      newDetail.value = { name: '', description: '', cost: 0, quantity_detail: 0 }; // Reset detail values
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении детали: ' + (error.response?.data?.message || error.message);
    successMessage.value = '';
  }
return { isModalOpen, successMessage, errorMessage, newDetail };
}
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <button @click="openAddDetailModal" title="Добавить деталь" class="addbutton">
      <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
      </svg>
    </button>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:my-15 sm:align-middle sm:max-w-md sm:w-full">
      <div class="bg-white px-6 py-5 rounded-lg">
        <div class="flex flex-col">
          <div class="text-center">
            <h3 class="text-lg leading-6 text-gray-900">Добавить новую деталь</h3>
          </div>
            <form @submit.prevent="addDetail">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mt-2 mb-2">Название</label>
                <input type="text" id="name" v-model="newDetail.name" required class="input-style">
              </div>
              <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700 mt-2 mb-2">Описание</label>
                <textarea id="description" v-model="newDetail.description" rows="3" required class="input-style"></textarea>
              </div>
              <div class="mb-4">
                <label for="cost" class="block text-sm font-medium text-gray-700 mt-2 mb-2">Стоимость</label>
                <input type="number" id="cost" v-model.number="newDetail.cost" required class="input-style">
              </div>
              <div class="mb-4">
                <label for="quantity_detail" class="block text-sm font-medium text-gray-700 mt-2 mb-2">Общее количество</label>
                <input type="number" id="quantity_detail" v-model.number="newDetail.quantity_detail" required class="input-style">
              </div>
              <div class="flex items-center justify-end p-6 border-gray-300 rounded-b">
                <button type="submit" class="send-button">
                  Добавить
                </button>
                <button @click="isModalOpen = false" class="send-button-e">
                  Отмена
                </button>
              </div>
              <p v-if="successMessage" class="p-3 bg-green-200 text-green-800 rounded">{{ successMessage }}</p>
              <p v-if="errorMessage" class="p-3 bg-red-200 text-red-800 rounded">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.input-style {
  width: 100%; /* Задает ширину поля на 100% контейнера */
  padding: 8px 12px; /* Внутренние отступы сверху/снизу и справа/слева */
  border: 1px solid #d5d7da; /* Толщина, стиль и цвет рамки */
  box-sizing: border-box; /* Управление размерами элемента включая padding и border */
  transition: border-color 0.3s; /* Плавное изменение цвета рамки */
  box-shadow: none;
  font-size: 14px;
}

.input-style:focus {
  border-color: #ff8c01; /* Цвет рамки при фокусе */
  outline: none; /* Убирает дополнительное выделение при фокусе */
}

.send-button-e {
  background: #223038;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

.send-button-e:hover {
  background-color: #2f353b; /* Цвет кнопки при наведении */
}

.send-button {
  background: #ff8c01;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
  margin-right: 15px; /* Добавляем пространство справа от кнопки */
}

.send-button:hover {
  background-color: #ffc732; /* Цвет кнопки при наведении */
}

.addbutton {
  padding: 0;
  width: 64px;
  height: 64px;
  background-color: #ff8c01;
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: ease-in 0.2s;
  outline: none;
}
</style>

