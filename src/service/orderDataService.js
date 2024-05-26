import http from "../../apiService.js";

class userDataService {
  getAll() {
    return http.get("/");
  }

  getOn(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }
}

export default new userDataService();