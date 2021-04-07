import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import AppHeader from '@/components/AppHeader'
import Boards from '@/pages/Boards'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        auth: Signup
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        header: AppHeader,
        auth: Signin
      }
    },
    {
       path: '/',
       name: 'home',
      components: {
          header: AppHeader,
          boards: Boards
      },
      beforeEnter (to, from, next){
        const {isAuthorized} = store.getters
        if (!isAuthorized){
          alert('로그인이 필요합니다!')
          //로그인이 안되있으면 로그인 페이지로 이동시킨다.
          next({ name: 'Signin'})
        }
        next()
      }
    },



  ]
})
