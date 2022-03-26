import { defineStore } from "pinia";

export default defineStore({
  id: "store",

  state: () => ({
    token: "",
  }),

  getters: {},

  actions: {
    INIT_TOKEN(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
  },
});
