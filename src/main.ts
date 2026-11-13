import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import './lib/gsap'
import App from './App.vue'
import { registerDirectives } from './directives'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: 'Home' } },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
      meta: { title: 'Work' },
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('./views/ProjectDetail.vue'),
      meta: { title: 'Case study' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue'),
      meta: { title: 'Contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue'),
      meta: { title: 'Lost' },
    },
  ],
})

const app = createApp(App)
app.use(router)
registerDirectives(app)
app.mount('#app')
