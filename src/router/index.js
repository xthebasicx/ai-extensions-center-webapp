import { createRouter, createWebHistory } from 'vue-router'
import { AuthService } from '@/services/auth'
import AdminLogin from '../views/admin/login/LoginView.vue'
import AdminForgotpassword from '../views/admin/login/ForgotpasswordView.vue'
import AdminSignup from '../views/admin/login/SignupView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminDashboard from '../views/admin/DashboardView.vue'
import AdminDocument from '../views/admin/DocumentView.vue'
import AdminExtensionList from '../views/admin/extension/ListView.vue'
import AdminExtensionDetail from '../views/admin/extension/DetailView.vue'
import AdminExtensionCreate from '../views/admin/extension/UpdateView.vue'
import AdminExtensionUpdate from '../views/admin/extension/UpdateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin/signup',
      name: 'admin-signup',
      component: AdminSignup
    },
    {
      path: '/admin/forgotpassword',
      name: 'admin-forgotpassword',
      component: AdminForgotpassword
    },
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/',
          redirect: '/admin/dashboard'
        },
        {
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/extensions',
          name: 'admin-extensions',
          component: AdminExtensionList,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/extensions/:id',
          name: 'admin-extensions-detail',
          component: AdminExtensionDetail,
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/extensions/create',
          name: 'admin-extensions-create',
          component: AdminExtensionCreate,
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/extensions/edit/:id',
          name: 'admin-extensions-update',
          component: AdminExtensionUpdate,
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/document',
          name: 'admin-document',
          component: AdminDocument,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next();
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const tokenExpires = Number(localStorage.getItem('tokenExpires'));

  if (!accessToken || !refreshToken || !tokenExpires) {
    return redirectToLogin(to, next);
  }

  if (Date.now() >= tokenExpires) {
    const newAccessToken = await AuthService.refreshToken();
    if (!newAccessToken) {
      return redirectToLogin(to, next);
    }
  }

  next();
});

function redirectToLogin(to, next) {
  next({ name: 'admin-login', query: { redirect: to.fullPath } });
}

export default router
