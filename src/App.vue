<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { Library, LogOut, User as UserIcon } from 'lucide-vue-next'
import { useAuthStore } from './stores/auth'
import { useLibraryStore } from './stores/library'
import { watch, onMounted } from 'vue'

const authStore = useAuthStore()
const libraryStore = useLibraryStore()
const router = useRouter()

// Cargar la colección al iniciar la app si hay usuario
onMounted(() => {
  libraryStore.loadUserCollection()
})

// Recargar la colección cuando cambie la sesión
watch(() => authStore.isAuthenticated, () => {
  libraryStore.loadUserCollection()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar glass-panel">
    <div class="container nav-content">
      <div class="logo-section">
        <Library :size="32" class="logo-icon" />
        <span class="logo-text">Lumina<br><span class="accent">Library</span></span>
      </div>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="active">Explorar</RouterLink>
        <RouterLink v-if="authStore.isAuthenticated" to="/collection" class="nav-link" active-class="active">Mi Colección</RouterLink>
        
        <div v-if="authStore.isAuthenticated" class="user-profile">
          <img :src="authStore.user.avatar" class="avatar" alt="Avatar" />
          <span class="username">{{ authStore.user.name }}</span>
          <button @click="handleLogout" class="logout-btn" title="Cerrar sesión">
            <LogOut :size="18" />
          </button>
        </div>
        <RouterLink v-else to="/login" class="btn-login">
          <UserIcon :size="18" />
          <span>Ingresar</span>
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 1.5rem !important;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  color: var(--primary);
}

.logo-text {
  font-weight: 800;
  line-height: 1;
  font-size: 1.2rem;
}

.logo-text .accent {
  color: var(--primary);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  transition: var(--transition);
  position: relative;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-main);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--primary);
}

.username {
  font-size: 0.9rem;
  font-weight: 600;
}

.logout-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 77, 77, 0.1);
  color: #ff4d4d;
}

.btn-login {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 1rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(129, 140, 248, 0.3);
}

@media (max-width: 640px) {
  .nav-links {
    gap: 1rem;
  }
  .username {
    display: none;
  }
}
</style>

