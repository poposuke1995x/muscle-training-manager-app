<template>
  <div>
    <p>{{res}}</p>

  </div>
</template>

<script>

export default {
  components: {

  },
  async asyncData({ $axios }) {
    const res = await $axios.$get("body_parts");
    return {res};
  },
  data() {
    return {

    };
  },
  async created() {

  }
};
</script>
