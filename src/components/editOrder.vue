<script setup>
import { ref, reactive, watch } from 'vue'
import apiService from '../../apiService';
import ApiService from '../../apiService.js'

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
});

const orderDetails = reactive({
  data: '',
  car: '',
  status: '',
  id_executer: '',
  time: ''
});

const emit = defineEmits(['orderUpdated', 'orders-updated']);

async function fetchOrderData() {
  try {
    const response = await apiService.get(`order/${props.orderId}`);
    Object.assign(orderDetails, response.data);
  } catch (error) {
    console.error('Ошибка при загрузке данных заказа:', error);
  }
}

async function updateOrders() {
  try {
    const response = await apiService.get(`order`);
    emit('orders-updated', response.data);
    console.log('Hello',response.data)
  } catch (error) {
    console.error('Ошибка при обновлении списка заказов:', error);
  }
}

async function submitForm() {
  console.log('Отправляемые данные для обновления заказа:', orderDetails);
  try {
    const response = await apiService.put(`order/${props.orderId}`, orderDetails);
    if (response.data) {
      console.log('Ответ от сервера после обновления заказа:', response.data);
      Object.assign(orderDetails, response.data);
      closeModal();
      emit('order-updated', orderDetails);
      await updateOrders();
    }
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error);
  }
}
const executers = ref([]);
async function fetchData() {
  try {
    const response = await ApiService.get('user/exe', {
      params: {
        role: 2
      }
    });
    executers.value = response.data;
  } catch (error) {
    console.error('Error fetching available executers:', error);
  }
}

const isModalOpen = ref(false);

function openEditModal() {
  isModalOpen.value = true;
  fetchOrderData();
}

function closeModal() {
  isModalOpen.value = false;
}

watch(() => props.orderId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchOrderData();
  }
}, { immediate: true });

fetchData()
</script>

<template>
  <div @click="openEditModal" class="absolute top-3 right-3 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
      <path d="M11 2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  </div>
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-6 py-5 rounded-lg">
        <div class="flex flex-col">
          <div class="text-center mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Редактировать заказ</h3>
          </div>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="mb-4">
              <label for="data" class="block text-sm font-medium text-gray-700">Дата</label>
              <input v-model="orderDetails.data" type="date" id="data" name="data"
                     class="input-style"
                     required>
            </div>
            <div class="mb-4">
            <label for="data" class="block text-sm font-medium text-gray-700">Время</label>
            <input v-model="orderDetails.time" type="time" id="time" name="time"
                   class="input-style"
                   required>
             </div>


        <div class="mb-4">
              <label for="car" class="block text-sm font-medium text-gray-700">Машина</label>
              <input v-model="orderDetails.car" type="text" id="car" name="car"
                     class="input-style"
                     required>
            </div>

            <div class="mb-4">
              <label for="status" class="block text-sm font-medium text-gray-700">Статус</label>
              <select v-model="orderDetails.status" id="status" name="status"
                      class="input-style">
                <option value="0">Создан</option>
                <option value="1">В процессе</option>
                <option value="2">Завершен</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="idExecuter" class="block text-sm font-medium text-gray-700">Исполнитель</label>
              <select v-model="orderDetails.id_executer" class="input-style" required>
                <option disabled value="">Выберите исполнителя</option>
                <option v-for="executer in executers" :key="executer.id" :value="executer.id">{{ executer.name }}</option>
              </select>
            </div>

            <div class="flex items-center justify-end p-6 rounded-b">
              <button type="submit" class="send-button">
                Сохранить изменения
              </button>
              <button type="button" @click="closeModal"
                      class="send-button-e">
                Отмена
              </button>
            </div>
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

</style>