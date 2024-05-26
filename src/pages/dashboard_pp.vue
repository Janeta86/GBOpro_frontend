<script>
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  computed: {
    ...mapGetters({
      isAdmin: 'isAdministrator',
      isMaster: 'isMaster'
    }),
    role() {
      return this.isAdmin ? 'Администратор' : this.isMaster ? 'Мастер' : 'Неопределено';
    }
  },
  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    }

    return {
      logout,
    };
  },
}
</script>

<template>
  <div class="bg-gray-800 font-sans leading-normal tracking-normal">
    <div class="flex h-screen bg-gray-100">
      <div class="bg-gray-800 shadow-lg h-full w-40">
        <div class="px-1 py-6">
          <ul class="relative">
            <router-link to="/" active-class="rounded-md bg-gray-700" class="mb-2 block">
              <a class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
                <span class="ml-2">Главная</span>
              </a>
            </router-link>
            <router-link to="/admin/detail" active-class="rounded-md bg-gray-700" class="mb-2 block">
              <a class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
                <span class="ml-2">Детали</span>
              </a>
            </router-link>
            <router-link to="/admin/user" active-class="rounded-md bg-gray-700" class="mb-2 block">
              <a class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
                <span class="ml-2">Пользователи</span>
              </a>
            </router-link>
            <router-link to="/admin/order" active-class="rounded-md bg-gray-700" class="mb-2 block">
              <a class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
                <span class="ml-2">Заказы</span>
              </a>
            </router-link>
            <router-link to="/admin/times" active-class="rounded-md bg-gray-700" class="mb-2 block">
              <a class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
                <span class="ml-2">Онлайн запись</span>
              </a>
            </router-link>
            <router-link to="/login" @click="logout" active-class="bg-gray-700" class="flex items-center text-white py-4 px-3 rounded-md hover:bg-gray-700">
              <span class="ml-2">Выход</span>
            </router-link>
          </ul>
        </div>
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="flex justify-between items-center p-3 bg-white border-b border-gray-200 shadow">
          <div class="flex items-center">
            <span class="text-lg font-semibold">Панель администратора</span>
          </div>
          <div class="flex items-center">
            <div>
            </div>
          </div>
        </header>
        <main class="flex-1 overflow-auto p-10">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
