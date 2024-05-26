import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../pages/dashboard_pp.vue'
import login_pp from '../pages/login_pp.vue'
import user_pp from '@/pages/user_pp.vue'
import order_pp from '@/pages/order_pp.vue'
import detail_pp from '@/pages/detail_pp.vue'
import userDetails from '@/pages/userDetails.vue'
import AdminTimesComponent from '@/pages/AdminTimesComponent.vue'
import startPage from '@/pages/startPage.vue'
import faq from '@/pages/faq_pp.vue'
import about from '@/pages/about.vue'
import contact from '@/pages/contact.vue'
import readGbo1 from '@/pages/readgbo/readGbo1.vue'
import readGbo2 from '@/pages/readgbo/readGbo2.vue'
import readGbo3 from '@/pages/readgbo/readGbo3.vue'
import readGbo4 from '@/pages/readgbo/readGbo4.vue'
import readGbo5 from '@/pages/readgbo/readGbo5.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/readgboone',
      component: readGbo1
    },
    {
      path: '/readgbotwo',
      component: readGbo2
    },
    {
      path: '/readgbothree',
      component: readGbo3
    },
    {
      path: '/readgbofour',
      component: readGbo4
    },
    {
      path: '/readgbofive',
      component: readGbo5
    },
    {
      path: '/',
      name: 'startPage',
      component: startPage
    },
    {
      path: '/faq',
      name: 'F.A.Q.',
      component: faq
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: dashboard,
      meta: { requiresAuth: true, roles: ['admin']},
      children: [
        {
          path: 'user',
          name: 'user',
          component: user_pp
        },
        {
          path: 'order',
          name: 'order_pp',
          component: order_pp
        },
        {
          path: '/user/:id',
          name: 'UserDetails',
          component: userDetails,
          props: route => ({ id: Number(route.params.id) })
        },
        {
          path: 'detail',
          name: 'detail_pp',
          component: detail_pp
        },
        {
          path: '/admin/times',
          name: 'AdminTimes',
          component: AdminTimesComponent // Компонент для работы с временем и датами
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login_pp
    },
    {
      path: '/',
      name: 'profile',
      component: startPage
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Проверяем, сохранен ли токен в localStorage
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Проверяем, требует ли маршрут аутентификации
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Получаем роль пользователя из localStorage

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // Перенаправляем на страницу входа, если пользователь не аутентифицирован
  } else if (to.meta.role && !to.meta.roles.includes(userRole)) {
    next('/login'); // Перенаправляем на страницу входа, если роль пользователя не соответствует требуемой роли
  } else {
    next(); // В противном случае продолжаем навигацию
  }
});

export default router
