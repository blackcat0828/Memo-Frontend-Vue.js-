import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

function init(){
  const savedToken = Cookies.get('accessToken')
  if (savedToken){
    //토큰 존재시 signinByToken 액션 반환
    return store.dispatch('signinByToken', savedToken)
  } else {
    //토큰이 존재하지 않는다면 바로 Promise를 성공시킨다.
    return Promise.resolve()
  }
}

init().then(res => {
  // init 함수의 then 체이닝 메소드 내부는 init 함수가 종료되었음을 보장받는다.
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
