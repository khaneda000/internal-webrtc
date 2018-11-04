import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: require('@/components/Root').default
    },
    {
      path: '/input-user',
      name: 'input-user',
      component: require('@/components/pages/InputUserPage').default
    },
    {
      path: '/input-room-id-page',
      name: 'input-room-id-page',
      component: require('@/components/pages/InputRoomIdPage').default
    },
    {
      path: '/room-page',
      name: 'room-page',
      component: require('@/components/pages/RoomPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
