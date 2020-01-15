import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const fetchBar = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("bar组件返回ajax数据");
    }, 1000);
  });
};

export function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: ""
    },
    mutations: {
      SET_BAR(state, data) {
        state.bar = data;
      }
    },
    actions: {
      fetchBar({ commit }) {
        return fetchBar().then(data => {
          commit("SET_BAR", data);
        });
      }
    },
    modules: {}
  });

  if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  return store;
}
