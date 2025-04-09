import axios from 'axios';
const csrfToken = ref<string | null>(null);
export const useCsrf = () => {
  const loadCsrf = () => {
    const { callApi } = useApi();
    callApi<string>('csrf').then(token => {
      csrfToken.value = token;
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    })
  }

  if (!csrfToken.value) {
    loadCsrf();
  }

  return {
    csrfToken,
    loadCsrf,
  }
}