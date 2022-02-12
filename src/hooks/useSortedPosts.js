import { ref, computed } from 'vue';

export default function useSortedPosts(posts) {
  const selectedSort = ref('');
  const sortedPosts  = computed(() => {
    return posts.sort((a, b) => {
      return a[selectedSort.value]?.localeCompare(b[selectedSort.value])
    })
  })
  
  return {
    selectedSort,
    sortedPosts
  }
} 