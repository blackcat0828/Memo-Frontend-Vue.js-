import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import AppHeader from '@/components/AppHeader'
import Boards from '@/pages/Boards'
import Memos from '@/pages/Memos'
import MemoForm from '@/pages/MemoForm'
import MemoView from '@/pages/MemoView'

Vue.use(Router)
const router = new Router({
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
       alias: '/boards',
       name: 'home',
      components: {
          header: AppHeader,
          boards: Boards
      },
    },
    {
      path: '/boards/personal/:boardId/momos',
      name: 'MemoLists',
      components: {
         header: AppHeader,
         boards: Boards,
         Memos: Memos
      },
      props: {
       Memos: true
      },
   },
   {
      path: '/boards/personal/:boardId/momos/form',
      name: 'MemoForm',
      components: {
        header: AppHeader,
        boards: Boards,
        Memos: MemoForm
      },
      props: {
        Memos: true
      },
    },
    {
      path: '/boards/personal/:boardId/momos/:memoId',
      name: 'MemoView',
      components: {
        header: AppHeader,
        boards: Boards,
        Memos: MemoView
      },
      props: {
        Memos: true
      },
    },

  ]
})

router.beforeEach((to, from, next) => {
  const {isAuthorized} = store.getters

  if(to.path==='/signin'){
    if(isAuthorized){
      next({ name: 'home'})
      return
    }
    else{
      next()
      return
    }
  }


  if(to.path==='/signup'){
       next()
       return
  }


  if (!isAuthorized){
        alert('로그인이 필요합니다!')
          //로그인이 안되있으면 로그인 페이지로 이동시킨다.
        next({ name: 'Signin'})
        }
  next()
})


export default router;
