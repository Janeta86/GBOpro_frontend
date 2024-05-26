<script setup>
import { ref } from 'vue';
import apiService from '../../apiService.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const passwordFieldType = ref('password');
const passwordVisible = ref(false);

const loginUser = async () => {
  try {
    console.log("Attempting login");
    console.log("Отправляемые данные:", email.value, password.value);
    const response = await apiService.post('user/login', {
      email: email.value,
      password: password.value
    });
    console.log("Ответ сервера:", response.data);
    if (response.data && response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      router.push('/admin');
      console.log('Пользователь успешно вошел:', response.data.user);
    } else {
      console.log('Неправильный email или пароль.');
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    console.error('Детали ошибки:', error.response ? error.response.data : "Нет деталей ответа");
  }
};

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
  passwordFieldType.value = passwordVisible.value ? 'text' : 'password';
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="loginUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="email" type="email" id="email" placeholder="Email" class="input-style">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Пароль
        </label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <input :type="passwordVisible ? 'text' : 'password'" v-model="password" placeholder="Пароль" class="input-style" required>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button type="button" @click="togglePasswordVisibility" class="text-gray-500">
              <svg v-show="!passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M16 8s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5S16 8 16 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
              </svg>
              <svg v-show="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/> <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83 a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="button-container">
        <button type="submit" class="send-button">
          Войти
        </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.input-style {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d5d7da;
  box-sizing: border-box;
  transition: border-color 0.3s;
  box-shadow: none;
  font-size: 14px;
}

.input-style:focus {
  border-color: #ff8c01;
  outline: none;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.send-button {
  background: #ff8c01;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

.send-button:hover {
  background-color: #ffc732;
}
</style>