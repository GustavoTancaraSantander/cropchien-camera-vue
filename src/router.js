import Vue from 'vue'
import Router from 'vue-router'
import HomeDefault from './views/Home.vue'

import Home from './components/Home.vue';
import Details from './components/Details.vue';
import Post from './components/Post.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homeDefault',
      name: 'homeDefault',
      component: HomeDefault
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details/:id',
      name: 'details',
      props: true,
      component: Details
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
  ]
})
