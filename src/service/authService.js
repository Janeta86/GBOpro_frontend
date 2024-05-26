import http from '../../apiService.js'


export default class AuthService {
  static async login(email, password) {
    try {
      const response = await http.post('user/login', { email, password });
      console.log("API login response:", response.data);
      return response;
    } catch (error) {
      console.error("API login error:", error);
      throw error;
    }
  }

  static async registration(email, password) {
    try {
      const response = await http.post('user/registration', { email, password });
      console.log("REGISTRATION_RESPONSE", response);
      return response;
    } catch (error) {
      console.error("REGISTRATION_ERROR", error);
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await http.post('user/logout');
      console.log("LOGOUT_RESPONSE", response);
      return response;
    } catch (error) {
      console.error("LOGOUT_ERROR", error);
      throw error;
    }
  }
}
