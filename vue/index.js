import Vue from 'vue';
import VueRouter from 'vue-router';
import VModal from 'element-ui';
import VueResource from 'vue-resource';
import account from '../../components/admin/account.vue';
import result from '../../components/admin/result.vue';

// 引入component
// import component from './component.vue';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VModal);

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [{
      path: '/account', component: account,
    }, {
      path: '/assess_result', component: result,
    },
    {
      path: '/', redirect: '/account',
    },
  ],
});

const vm = new Vue({
  el: '#app',
  router,
  components: { // components要注册
    account,
    result,
  },
  data: {
    user: window.user,
    toggle: false,
  },
  methods: {
    // logout: logout(),
  },
});

vm.user = window.user;
