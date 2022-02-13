import requests from '@/services/requests'
import { ref, onMounted } from 'vue';

export default function({limit, dialogVisible})  {
  const posts = ref([])
  const totalPages = ref(0)
  const page = ref(1)
  const loading = ref(true)
  const error = ref(false)
  const fetching = async () => {
    try {
      const res = await requests.get("/posts", { 
        _page: page.value,
        _limit: limit
      })
      totalPages.value = Math.ceil(res.headers['x-total-count'] / limit);
      posts.value = res.data; 
    } catch(e) {
      alert(e)
      error.value = true;
    } finally {
      loading.value = false;
    }
  }
  const createPost = async (post) => {
    try {
      const response = await requests.post("/posts", post)
      posts.value.push(response.data) 
      console.log(dialogVisible);
      dialogVisible.value = false
    } catch(e) {
      alert(e)
    }
  }
  const removePost = async (post) => {
    try {
      await requests.delete(`/posts/${post.id}`)
      posts.value = posts.value.filter(item => item !== post)
    } catch(e) {
      alert(e)
    }
  }
  onMounted(fetching)

  return {
    posts, 
    loading, 
    error, 
    totalPages, 
    page, 
    createPost, 
    removePost
  }
}