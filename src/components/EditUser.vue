<script setup>
  import { ref, reactive, watch, watchEffect } from 'vue';
  import apiService from '../../apiService';

  // Используйте defineProps для получения свойств из родительского компонента
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

  const userDetails = reactive({
    name: '',
    phone: '',
    email: '',
    comment: '',
    role: ''
  });

  // Функция для загрузки данных пользователя
  const fetchUserData = async () => {
    try {
      const response = await apiService.get(`user/${props.id}`);
      Object.assign(userDetails, response.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  };
  const submitForm = async () => {
    try {
      const response = await apiService.put(`user/users/${props.id}`, userDetails);
      Object.assign(userDetails, response.data); // Обновляем локальные данные после сохранения
      console.log('User updated:', response.data);
      closeModal();
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      alert("Не удалось обновить данные пользователя.");
    }
  };

  const isModalOpen = ref(false);

  const openEditModal = () => {
    isModalOpen.value = true;
    fetchUserData();
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Следим за изменением ID и загружаем данные пользователя при изменении
  watch(() => props.id, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchUserData();
    }
  }, { immediate: true });

  // Активируем загрузку данных при первой загрузке компонента
  watchEffect(() => {
    if (props.id) {
      fetchUserData();
    }
  });
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
            <h3 class="text-lg leading-6 font-medium text-gray-900">Редактировать пользователя</h3>
          </div>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
              <input v-model="userDetails.name" type="text" id="name" name="name" class="input-style" required>
            </div>

            <div class="mb-4">
              <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
              <input v-model="userDetails.phone" type="text" id="phone" name="phone" class="input-style" required>
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="userDetails.email" type="email" id="email" name="email" class="input-style" required>
            </div>

            <div class="mb-4">
              <label for="comment" class="block text-sm font-medium text-gray-700">Комментарий</label>
              <textarea v-model="userDetails.comment" id="comment" name="comment" rows="3" class="input-style"></textarea>
            </div>
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700">Роль</label>
              <select v-model="userDetails.role" class="input-style" required>
                <option disabled value="">Роль</option>
                <option value="0">Пользователь</option>
                <option value="1">Администратор</option>
                <option value="2">Мастер</option>
              </select>
            </div>


            <div class="flex items-center justify-end p-6 rounded-b">
              <button type="submit"  class="send-button">
                Сохранить изменения
              </button>
              <button type="button" @click="closeModal"  class="send-button-e">
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
