<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { LogIn, User, Lock, AlertCircle } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Por favor completa todos los campos';
    return;
  }

  loading.value = true;
  error.value = '';

  // Simulamos un retraso para que parezca real
  setTimeout(() => {
    const success = authStore.login(username.value, password.value);
    
    if (success) {
      router.push('/');
    } else {
      error.value = 'Usuario o contraseña incorrectos (prueba con 1234)';
      loading.value = false;
    }
  }, 1000);
};
</script>

<template>
  <div class="login-container container">
    <div class="login-card glass-panel">
      <div class="login-header">
        <div class="icon-circle">
          <LogIn :size="32" />
        </div>
        <h1>Bienvenido de nuevo</h1>
        <p>Ingresa tus credenciales para acceder a Lumina Library</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="username">Usuario</label>
          <div class="input-wrapper">
            <User :size="18" class="input-icon" />
            <input 
              v-model="username" 
              type="text" 
              id="username" 
              placeholder="Tu nombre de usuario"
              required
            >
          </div>
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <div class="input-wrapper">
            <Lock :size="18" class="input-icon" />
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              placeholder="••••••••"
              required
            >
          </div>
        </div>

        <transition name="shake">
          <div v-if="error" class="error-message">
            <AlertCircle :size="16" />
            <span>{{ error }}</span>
          </div>
        </transition>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else class="loader"></span>
        </button>
      </form>
      
      <div class="login-footer">
        <p>¿No tienes cuenta? <a href="#">Regístrate aquí</a></p>
        <p class="hint">Tip: Usa cualquier usuario y contraseña <strong>1234</strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding-top: 6rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 3rem;
  border-radius: 2.5rem;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.icon-circle {
  width: 64px;
  height: 64px;
  background: var(--primary-glow);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  color: var(--primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #aaa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
  margin-left: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(100, 108, 255, 0.1);
}

.login-btn {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 10px 20px rgba(100, 108, 255, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

.login-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.hint {
  margin-top: 1rem;
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.8rem;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.shake-enter-active {
  animation: shake 0.4s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>
