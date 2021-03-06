import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Footer from './components/common/Footer.vue'
import Header from './components/common/Header.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import LoginPlugin from './plugins/login-plugin';
import vuetify from './plugins/vuetify';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSession from 'vue-session';
import axios from 'axios';
import store from './store'
import VueDaumPostcode from "vue-daum-postcode"
import LoadScript from 'vue-plugin-load-script';
import VueMoment from 'vue-moment'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'




Vue.component('Footer', Footer)
Vue.component('Header', Header)
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseButton.name, BaseButton);

Vue.config.productionTip = false
Vue.prototype.$http = axios

//세션관리용
var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions)


Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(LoginPlugin);
Vue.use(VueDaumPostcode)
Vue.use(ElementUI);
Vue.use(VeeValidate, { inject: false, aria: true, validity: true, fieldsBagName: 'formFields' });
Vue.use(LoadScript);
Vue.use(VueMoment);
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.loadScript("http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false");
Vue.config.productionTip = false;
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

new Vue({
  router,
  locale: 'ko',
  store,
  created() {
    this.$store.dispatch('memberStore/getMemberInfo');





  },
  computed: {
    ...mapState(["loginStatus"]),
    jobs() {
      return this.$store.jobs;
    },

  },
  render: h => h(App),
  vuetify,
  methods: {
    reload: function () {
      this.$router.go(this.$router.currentRoute)
    }
  }
}).$mount('#app')
