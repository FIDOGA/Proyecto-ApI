import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isAuthenticated: !!localStorage.getItem("user"),
  }),

  actions: {
    login(username, password) {
      // Simulación de login: Aceptamos cualquier usuario con contraseña "1234"
      if (password === "1234") {
        const userData = {
          name: username,
          email: `${username.toLowerCase()}@example.com`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        };
        
        this.user = userData;
        this.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
    }
  },
});
