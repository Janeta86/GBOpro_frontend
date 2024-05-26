import { computed } from 'vue';
import { useStore } from 'vuex';

export function useAuth() {
  const store = useStore();

  // Компоновка данных пользователя
  const user = computed(() => store.state.user);
  const token = computed(() => store.state.token);

  // Методы для входа и выхода
  const login = async (email, password) => {
    try {
      await store.dispatch('login', { email, password });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await store.dispatch('logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Вычисляемые значения для проверки аутентификации и получения роли
  const isAuthenticated = computed(() => !!token.value);
  const userEmail = computed(() => user.value?.email);
  const userRole = computed(() => {
    switch (user.value?.role) {
      case 1: return 'Администратор';
      case 2: return 'Мастер';
      default: return 'Пользователь';
    }
  });

  return { user, token, login, logout, isAuthenticated, userEmail, userRole };
}