<script setup>
import { ref, onMounted } from 'vue';
import { X, BookOpen, User, Calendar, Tag, Save, Trash2, CheckCircle2, Clock, PlayCircle } from 'lucide-vue-next';
import { useLibraryStore } from '../stores/library';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
  bookId: String,
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const store = useLibraryStore();
const authStore = useAuthStore();
const bookMetadata = ref({ status: 'Quiero leer', notes: '' });
const isSaving = ref(false);

const statuses = [
  { label: 'Quiero leer', icon: Clock, color: '#94a3b8' },
  { label: 'Leyendo', icon: PlayCircle, color: '#818cf8' },
  { label: 'Leído', icon: CheckCircle2, color: '#10b981' }
];

const loadMetadata = () => {
  const collectionBook = store.myCollection.find(b => b.id === props.bookId);
  if (collectionBook) {
    bookMetadata.value = { 
      status: collectionBook.status || 'Quiero leer', 
      notes: collectionBook.notes || '' 
    };
  }
};

onMounted(async () => {
  await store.fetchBookDetails(props.bookId);
  loadMetadata();
});

const handleSave = () => {
  isSaving.value = true;
  store.updateBookMetadata(props.bookId, bookMetadata.value);
  setTimeout(() => {
    isSaving.value = false;
    emit('close');
  }, 600);
};

const removeFromLibrary = () => {
  if (confirm('¿Seguro que quieres quitar este libro de tu colección?')) {
    store.removeFromCollection(props.bookId);
    emit('close');
  }
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content glass-panel animate-slide-up">
      <button class="close-btn" @click="$emit('close')">
        <X :size="24" />
      </button>

      <div v-if="store.loading" class="loading-state">
        <div class="loader"></div>
        <p>Consultando los archivos reales...</p>
      </div>

      <div v-else-if="store.currentBook" class="book-details">
        <div class="details-grid">
          <div class="cover-side">
            <img 
              v-if="store.currentBook.covers" 
              :src="`https://covers.openlibrary.org/b/id/${store.currentBook.covers[0]}-L.jpg`" 
              class="large-cover"
            />
            <div v-else class="no-cover-placeholder">No Cover</div>
          </div>

          <div class="info-side">
            <h2 class="title">{{ store.currentBook.title }}</h2>
            
            <div class="meta-tags">
              <span v-if="store.currentBook.first_publish_date" class="tag">
                <Calendar :size="14" /> {{ store.currentBook.first_publish_date }}
              </span>
            </div>

            <div class="description-scroll">
              <p v-if="store.currentBook.description" class="description">
                {{ store.currentBook.description }}
              </p>
              <p v-else class="description-none">Sin descripción disponible en los archivos.</p>
            </div>

            <!-- Personalized Section for Collection -->
            <div v-if="store.myCollection.some(b => b.id === bookId)" class="personal-section">
              <h3>Mi Progreso</h3>
              <div class="status-selector">
                <button 
                  v-for="s in statuses" 
                  :key="s.label"
                  @click="bookMetadata.status = s.label"
                  class="status-pill"
                  :class="{ active: bookMetadata.status === s.label }"
                  :style="{ '--status-color': s.color }"
                >
                  <component :is="s.icon" :size="16" />
                  {{ s.label }}
                </button>
              </div>

              <h3>Mis Notas</h3>
              <textarea 
                v-model="bookMetadata.notes" 
                placeholder="Escribe tus reflexiones sobre este libro..."
                class="notes-area"
              ></textarea>

              <div class="action-footer">
                <button @click="removeFromLibrary" class="btn-danger">
                  <Trash2 :size="18" /> Quitar
                </button>
                <button @click="handleSave" class="btn-save" :disabled="isSaving">
                  <Save v-if="!isSaving" :size="18" />
                  <span v-else class="loader-small"></span>
                  {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.modal-content {
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  overflow-y: auto;
  padding: 3rem;
  border-radius: 2rem;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: white;
}

.details-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
}

.large-cover {
  width: 100%;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
}

.title {
  font-size: 2.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.meta-tags {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  color: var(--primary);
}

.description-scroll {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 2rem;
  padding-right: 1rem;
}

.description {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.personal-section h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-main);
  border-left: 3px solid var(--primary);
  padding-left: 0.75rem;
}

.status-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.status-pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.status-pill.active {
  background: var(--status-color);
  color: white;
  border-color: var(--status-color);
  box-shadow: 0 5px 15px var(--status-color);
  opacity: 0.8;
}

.notes-area {
  width: 100%;
  min-height: 120px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  font-family: inherit;
  margin-bottom: 2rem;
  resize: vertical;
}

.action-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-save, .btn-danger {
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-save {
  background: var(--primary);
  color: white;
  border: none;
  flex: 2;
}

.btn-danger {
  background: rgba(255, 77, 77, 0.1);
  color: #ff4d4d;
  border: 1px solid rgba(255, 77, 77, 0.2);
}

.btn-danger:hover {
  background: #ff4d4d;
  color: white;
}

.loading-state {
  text-align: center;
  padding: 5rem 0;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--glass-border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 2rem;
  }
  .details-grid {
    grid-template-columns: 1fr;
  }
  .cover-side {
    max-width: 200px;
    margin: 0 auto;
  }
  .status-selector {
    flex-direction: column;
  }
}
</style>
