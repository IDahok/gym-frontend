import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Students from '../views/Students.vue';
import Plans from '../views/Plans.vue';
import Attendance from '../views/Attendance.vue';
import Payments from '../views/Payments.vue';
import MainLayout from '../layouts/MainLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import Employees from '../views/Employees.vue';
import Products from '../views/Products.vue';
import Sales from '../views/Sales.vue';
import Settings from '../views/Settings.vue';
import Profile from '../views/Profile.vue';
import PaymentMethods from '../views/PaymentMethods.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
        { path: 'students', name: 'students', component: Students },
        { path: 'plans', name: 'plans', component: Plans },
        { path: 'attendance', name: 'attendance', component: Attendance },
        { path: 'payments', name: 'payments', component: Payments }
        ,{ path: 'employees', name: 'employees', component: Employees }
        ,{ path: 'products', name: 'products', component: Products }
        ,{ path: 'sales', name: 'sales', component: Sales }
        ,{ path: 'settings', name: 'settings', component: Settings }
        ,{ path: 'profile', name: 'profile', component: Profile }
        ,{ path: 'payment-methods', name: 'payment-methods', component: PaymentMethods }
      ]
    },
    {
      path: '/',
      component: AuthLayout,
      meta: { publicOnly: true },
      children: [
        { path: 'login', name: 'login', component: Login },
        { path: 'register', name: 'register', component: Register }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuthenticated;
  if (to.matched.some(r => r.meta.requiresAuth) && !isAuth) return next({ name: 'login' });
  if (to.matched.some(r => r.meta.publicOnly) && isAuth) return next({ name: 'dashboard' });
  next();
});

export default router;


