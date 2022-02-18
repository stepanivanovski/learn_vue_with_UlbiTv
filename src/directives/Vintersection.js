export default {
  mounted(el, b) {
    console.log(el, b);
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries) => {
      console.log(b.value);
      if (entries[0].isIntersecting) {
        b.value.loadMorePosts();
      }
      };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(el)
  },
  name:'intersection'
}