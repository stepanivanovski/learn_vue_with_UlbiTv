import requests from '@/services/requests'

const state = () => ({
  posts: [],
  selectedSort: '',
  sortOptions: [
    { value: 'title', name: 'По названию'},
    { value: 'body', name: 'По содержимому'}
  ],
  searchQuery: '',
  loading: true,
  error: false,
  page: 1,
  limit: 3,
  totalPages: 0
})

const getters = {
  sortedPosts(state) {
    return [...state.posts].sort((a, b) => {
      return a[state.selectedSort]?.localeCompare(b[state.selectedSort])
    })
  },
  sortedAndSearchedPosts(state, getters) {
    return getters.sortedPosts.filter(post => post.title?.includes(state.searchQuery))
  }
}

const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setPage(state, page) {
    state.page = page
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  },
  setTotalPages(state, totalPages) {
    state.totalPages = totalPages
  },
  setSearchQuery(state, searchQuery) {
    state.searchQuery = searchQuery
  },
  setSelectedSort(state, selectedSort){
    state.selectedSort = selectedSort
  }
}

const actions = {
  async fetchPosts({ state, commit }) {
    try {
      commit('setLoading', true);
      const res = await requests.get("/posts", { 
        _page: state.page,
        _limit: state.limit
      })
      commit('setTotalPages',  Math.ceil(res.headers['x-total-count'] / state.limit));
      commit('setPosts', res.data) 
    } catch(e) {
      alert('Ошибка')
      commit('error', true)
    } finally {
      commit('setLoading', false)
    }
  },
   async loadMorePosts({ state, commit }) {
    try {
      commit('setPage', state.page +=1)
      const res = await requests.get("/posts", { 
        _page: state.page,
        _limit: state.limit
      })
      commit('setTotalPages',  Math.ceil(res.headers['x-total-count'] / state.limit));
      commit('setPosts', [...state.posts, ...res.data]) 
    } catch(e) {
      alert('Ошибка')
      commit('error', true)
    } finally {
      commit('setLoading', false);
    }
  },
  async removePost({ state, commit }, {post}) {
    try {
      await requests.delete(`/posts/${post.id}`)
      const posts = state.posts.filter(item => item !== post)
      commit('setPosts', posts) 
    } catch(e) {
      alert(e)
    }
  }, 
  async createPost({ state, commit }, {post}) {
    try {
      const response = await requests.post("/posts", post)
      commit('setPosts', [post, ...state.posts]) 
      return response
    } catch(e) {
      alert(e)
    }
  }
}

export const postModule = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
} 