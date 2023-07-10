import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import TheHeader from './components/TheHeader.vue';
import KeywordText from './components/KeywordText.vue';
import KeywordTable from './components/KeywordTable.vue';

import TheNav from './components/TheNav.vue';
import FontAwesomeIcon from './fontAwesome';

import 'ant-design-vue/dist/antd.css';
import './style.css';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('the-header', TheHeader);
Vue.component('the-nav', TheNav);
Vue.component('the-text', KeywordText);
Vue.component('the-table', KeywordTable);

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
