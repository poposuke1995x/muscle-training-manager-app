export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = JSON.parse(localStorage.getItem('my-key')).token;
    return config;
  })


  $axios.onError(error => console.log(error))
}
