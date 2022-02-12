import requests from '@/services/requests'
import { ref, onMounted} from 'vue';

export function fetchPosts(limit)  {
  const posts = ref([]);
  const totalPages = ref(0);
  const loading = ref(true);
  const error = ref(false);
  const fetching = async () => {
    try {
      const res = await requests.get("/posts", { 
        _page: this.page,
        _limit: this.limit
      })
      totalPages.value = Math.ceil(res.headers['x-total-count'] / limit);
      posts.value = res.data; 
    } catch(e) {
      alert('Ошибка')
      error.value = true;
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetching)
  return {
    posts, loading, error, totalPages
  }
}