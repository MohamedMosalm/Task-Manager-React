export const authService = {
  storeAuthData: (authData) => {
    localStorage.setItem("access_token", authData.access_token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  },

  getToken: () => {
    return localStorage.getItem("access_token");
  },

  getUser: () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  clearAuthData: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};

export default authService;
