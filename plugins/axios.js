export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    setHeader(config);
  })

  async function getToken(store) {
    return await store.getters.getToken;
  }

  async function setHeader(config) {
    config.headers.common['Authorization'] = await getToken(store);
  }

  $axios.onError(error => console.log(error))
}
