import Main from '@/pages/Main';
import StorePostsPage from '@/pages/StorePostsPage';
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi'
import PostsPage from '@/pages/PostsPage';
import About from '@/pages/About';
import PostPage from '@/pages/PostPage'

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/store',
    component: StorePostsPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/composition',
    component: PostsPageCompositionApi
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;