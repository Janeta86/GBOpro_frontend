<script setup>
import { ref, defineProps } from 'vue';
import ApiService from '../../apiService.js';

const props = defineProps({
  orderId: Number
});

const isModalOpen = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const newOrderDetail = ref({ detailId: '', quantity: 0 });
const availableDetails = ref([]);

function openAddDetailModal() {
  isModalOpen.value = true;
  fetchAvailableDetails();
}

async function fetchAvailableDetails() {
  try {
    const response = await ApiService.get('/detail');
    availableDetails.value = response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
    errorMessage.value = 'Не удалось загрузить детали: ' + error.message;
  }
}

async function addOrderDetail() {
  // Валидация
  if (!newOrderDetail.value.detailId || newOrderDetail.value.quantity <= 0) {
    errorMessage.value = 'Необходимо выбрать деталь и указать количество.';
    return;
  }

  // Отправка данных
  try {
    await ApiService.post('/orderdetail', {
      id_orders: props.orderId,
      id_details: newOrderDetail.value.detailId,
      quantity: newOrderDetail.value.quantity
    });
    successMessage.value = 'Деталь успешно добавлена к заказу.';
    setTimeout(() => {
      isModalOpen.value = false;
      resetForm();  // Resetting the form here
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении детали к заказу: ' + (error.response?.data?.message || error.message);
  }
}

function resetForm() {
  newOrderDetail.value = { detailId: '', quantity: 0 };
  successMessage.value = ''; // Обеспечиваем, что сообщение об успехе очищается после его показа
  fetchAvailableDetails(); // Обновление деталей после добавления
}

</script>


<template>
  <div class="fixed bottom-4 right-4">
    <button @click="openAddDetailModal" title="Добавить деталь" class="addbutton">
      <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z" />
      </svg>
    </button>
  </div>
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:my-15 sm:align-middle sm:max-w-md sm:w-full">
      <div class="bg-white px-6 py-5 rounded-lg">
        <div class="flex flex-col">
          <div class="text-center">
            <h3 class="text-lg leading-10 font-medium text-gray-900">Добавить новую деталь к заказу</h3>
          </div>
          <form @submit.prevent="addOrderDetail">
            <div class="mb-4">
              <label for="detail" class="block text-sm font-medium text-gray-700">Деталь</label>
              <select v-model="newOrderDetail.detailId" required class="input-style">
                <option disabled value="">Выберите деталь</option>
                <option v-for="detail in availableDetails" :key="detail.id" :value="detail.id">{{ detail.name }} (Доступно: {{ detail.quantity_detail }})</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700">Количество</label>
              <input type="number" v-model.number="newOrderDetail.quantity" required min="1" class="input-style">
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