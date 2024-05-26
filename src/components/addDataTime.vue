<script setup>
import { ref } from 'vue';
import ApiService from '../../apiService.js';

const isModalOpen = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const newDataTime = ref({
  date: '',
  time: '',
  executerId: '',
  available: ''
});
const availableExecuters = ref([]);

function openAddDetailModal() {
  isModalOpen.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  newDataTime.value = { date: '', time: '', executerId: '', available: '' };
  fetchData();
}

async function fetchData() {
  try {
    const { data } = await ApiService.get('/user/exe', {
      params: { role: 2 }
    });
    availableExecuters.value = data;
  } catch (error) {
    console.error('Error fetching available executers:', error);
    errorMessage.value = 'Не удалось загрузить исполнителей: ' + error.message;
  }
}

function formatDateInput(value) {
  if (!value) return '';

  let numbers = value.replace(/\D/g, '');
  if (numbers.length < 8) return value; // Не обрабатываем, если число неполное

  let day = numbers.slice(0, 2);
  let month = numbers.slice(2, 4);
  let year = numbers.slice(4, 8);
  return `${year}-${month}-${day}`; // Возвращаем в формате ISO
}

function handleDateInput(event) {
  const formatted = formatDateInput(event.target.value);
  newDataTime.value.date = formatted; // Присваиваем отформатированное значение
}

async function addDataTime() {
  try {
    await ApiService.post('/available', newDataTime.value);
    successMessage.value = 'Время успешно добавлено.';
    errorMessage.value = '';
    setTimeout(() => {
      isModalOpen.value = false;
      newDataTime.value = { date: '', time: '', executerId: '', available: '' };
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении времени: ' + (error.response?.data?.message || error.message);
    console.error('Error adding time:', error);
  }
}
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <!-- Кнопка для открытия модального окна -->
    <button @click="openAddDetailModal" title="Добавить время и дату" class="addbutton">
      <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
      </svg>
    </button>
  </div>

  <!-- Модальное окно -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:my-15 sm:align-middle sm:max-w-md sm:w-full">
      <div class="bg-white px-6 py-5 rounded-lg">
        <div class="flex flex-col">
          <div class="text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Добавить новые дату и время</h3>
          </div>
          <!-- Форма для добавления новых данных времени -->
          <form @submit.prevent="addDataTime">
            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700 mt-2 mb-2">Дата</label>
              <input type="text" id="date" :value="newDataTime.date" @input="handleDateInput" placeholder="дд-мм-гггг" class="input-style" required>
            </div>
            <div class="mb-4">
              <label for="time" class="block text-sm font-medium text-gray-700">Время</label>
              <input type="text" id="time" v-model="newDataTime.time" placeholder="чч:мм" required class="input-style">
            </div>
            <div class="mb-4">
              <label for="executerId" class="block text-sm font-medium text-gray-700">Исполнитель</label>
              <select v-model="newDataTime.executerId" class="input-style" required>
                <option disabled value="">Выберите исполнителя</option>
                <option v-for="executer in availableExecuters" :key="executer.id" :value="executer.id">{{ executer.name }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Доступ</label>
              <select v-model="newDataTime.available" class="input-style" required>
                <option disabled value="">Выберите доступ</option>
                <option class="mb-3 block text-sm font-medium text-black dark:text-white" value="true">Доступно</option>
                <option class="mb-3 block text-sm font-medium text-black dark:text-white" value="false">Недоступно</option>
              </select>
            </div>
            <div class="flex items-center justify-end p-6 border-gray-300 rounded-b">
              <button type="submit" class="send-button">Добавить</button>
              <button @click="isModalOpen = false" class="send-button-e">Отмена</button>
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
