import axios from "axios";

let Http = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

Http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

Http.defaults.withCredentials = true;

export default Http;
