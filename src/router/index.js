import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Near from '@/components/Near'
import Item from '@/components/Item'
import Form from '@/components/Form'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/near',
      name: 'Near',
      component: Near
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: Item
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/success',
      name: 'AuthSuccess',
      component: AuthSuccess
    }
  ]
})
