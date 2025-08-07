import config from "../config/config";

export const authService = {
  storeAuthData: (authData) => {
    localStorage.setItem(config.TOKEN_STORAGE_KEY, authData.access_token);
    localStorage.setItem(
      config.USER_STORAGE_KEY,
      JSON.stringify(authData.user)
    );
  },

  getToken: () => {
    return localStorage.getItem(config.TOKEN_STORAGE_KEY);
  },

  getUser: () => {
    const userData = localStorage.getItem(config.USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  clearAuthData: () => {
    localStorage.removeItem(config.TOKEN_STORAGE_KEY);
    localStorage.removeItem(config.USER_STORAGE_KEY);
  },

  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export default authService;
