<script>
import { ref } from 'vue';
import ApiService from '../../apiService.js';
import { MaskInput } from 'vue-3-mask'


export default {
  components: {
    MaskInput
  },
  setup() {
    const isModalOpen = ref(false);
    const newUser = ref({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: ''
    });
    const emailValid = ref(null);
    const passwordFieldType = ref('password');
    const passwordVisible = ref(false);

    function openAddUserModal() {
      isModalOpen.value = true;
    }

    function togglePasswordVisibility() {
      passwordVisible.value = !passwordVisible.value;
      passwordFieldType.value = passwordVisible.value ? 'text' : 'password';
    }

    async function addUser() {
      // if (emailValid.value) {
        const roleValue = newUser.value.role === 'admin' ? 1 : newUser.value.role === 'master' ? 2 : 0;
        const userToSubmit = {
          ...newUser.value,
          role: roleValue
        };
        try {
          const response = await ApiService.post('/user/c', userToSubmit);
          console.log('User added successfully:', response.data);
          isModalOpen.value = false;
          newUser.value = { name: '', email: '', phone: '', password: '', role: '' };
        } catch (error) {
          console.error('Error adding user:', error);
        }
      // } else {
      //   console.log('Пожалуйста, проверьте правильность введенных данных.');
      // }
    }

    return {
      isModalOpen,
      newUser,
      emailValid,
      openAddUserModal,
      addUser,
      togglePasswordVisibility,
      passwordFieldType,
      passwordVisible
    };
  }
};
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button @click="openAddUserModal" title="Добавить пользователя" class="addbutton">
      <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
      </svg>
    </button>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl transform transition-all sm:my-15 sm:align-middle sm:max-w-md sm:w-full"> <!-- Изменен класс "sm:max-w-xs" на "sm:max-w-md" -->
      <div class="bg-white px-6 py-5 rounded-lg">
        <div class="flex flex-col">
          <div class="text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Добавить нового пользователя</h3>
          </div>
          <form @submit.prevent="addUser" class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Имя</label>
            <input v-model="newUser.name" placeholder="Имя" class="input-style" required>
            <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Email</label>
            <input v-model="newUser.email" placeholder="Email" class="input-style" required>
            <p v-if="emailValid === false" >Такой email уже существует или неверен.</p>
            <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Телефон</label>
            <MaskInput mask="+7(###)###-####" v-model="newUser.phone" placeholder="Телефон" class="input-style" required>
              <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Телефон</label>
            </MaskInput>
            <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Пароль</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input :type="passwordVisible ? 'text' : 'password'" v-model="newUser.password" placeholder="Пароль"  class="input-style" required>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button type="button" @click="togglePasswordVisibility" class="text-gray-500">
                  <svg v-show="!passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M16 8s-3 5.5-8 5.5S0 8 0 8s3-5.5 8-5.5S16 8 16 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
                  </svg>
                  <svg v-show="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/> <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                  </svg>
                </button>
              </div>
            </div>
            <label class="block text-sm font-medium text-gray-700 mt-2 mb-2">Выберите роль</label>
            <select v-model="newUser.role" class="input-style" required>
              <option  disabled value="">Выберите роль</option>
              <option class="mb-3 block text-sm font-medium text-black dark:text-white" value="admin">Администратор</option>
              <option class="mb-3 block text-sm font-medium text-black dark:text-white" value="master">Мастер</option>
            </select>
            <div class="flex items-center justify-end p-6 rounded-b">
              <button type="submit" class="send-button">
                Добавить
              </button>
              <button @click="isModalOpen = false" class="send-button-e">
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
