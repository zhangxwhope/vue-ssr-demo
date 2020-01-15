<template>
  <div class="hello">
    <h1 @click="clickMsg">{{ msg }}</h1>
    <p>异步数据如下：</p>
    <div>{{ ajaxData }}</div>
  </div>
</template>

<script>
const fetchInitialData = ({ store }) => {
  store.dispatch("fetchBar");
};
export default {
  asyncData: fetchInitialData,
  name: "HelloWorld",
  data() {
    return {};
  },
  props: {
    msg: String
  },
  computed: {
    ajaxData() {
      return this.$store.state.bar;
    } // 异步数据
  },
  mounted() {
    let store = this.$store;
    fetchInitialData({ store });
  },
  methods: {
    clickMsg() {
      alert("hello world");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
