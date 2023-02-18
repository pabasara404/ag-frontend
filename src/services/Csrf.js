import Http from "./Http";

export default {
  getCookie() {
    return Http.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
  },
};
