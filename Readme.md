#  Lumina Library - Gestor de Libros Inteligente

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5+-4fc08d?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3+-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0+-ffe162?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Open Library](https://img.shields.io/badge/API-OpenLibrary-ff69b4?style=for-the-badge&logo=bookstack&logoColor=white)](https://openlibrary.org/developers/api)

**Lumina Library** es una plataforma digital sofisticada para bibliófilos que buscan organizar su vida literaria con estilo. Conectada a la base de datos global de **Open Library**, esta aplicación no solo permite buscar libros, sino crear un diario de lectura personal y privado.

---

##  Características Destacadas

###  Exploración Inteligente
- **Motor de Búsqueda Flexible**: Encuentra obras por título, autor o identificadores únicos.
- **Filtros de Acceso Rápido**: Chips de categorías integrados (Fantasía, Ciencia Ficción, Historia, etc.) para descubrir clásicos y novedades con un clic.
- **Idiomas Inteligentes**: Resultados optimizados automáticamente para el mercado de habla hispana.

###  Diario de Lectura Personalizado
- **Estados de Progreso**: Clasifica tus libros en categorías como "Quiero leer", "Leyendo" o "Leído" con indicadores visuales inmediatos.
- **Bloc de Notas Privado**: Cada libro cuenta con un espacio dedicado para tus anotaciones, críticas o citas favoritas.
- **Persistencia Multi-Usuario**: Cada usuario (según su nombre en el Login) tiene su propia base de datos local totalmente aislada. ¡Lo que tú anotas, se queda en tu sesión!

###  Experiencia de Usuario "Premium"
- **Details Modal**: Ventana flotante inmersiva para leer sinopsis completas y gestionar metadatos sin perder el contexto de la búsqueda.
- **Estética Glassmorphism**: Uso avanzado de desenfoques, bordes sutiles y gradientes cinéticos que dan una sensación de profundidad y elegancia.
- **Micro-interacciones Fluidas**: Animaciones escalonadas y transiciones suaves que hacen que la navegación se sienta natural y "viva".

---

##  Stack Tecnológico

- **Vue.js 3 (Composition API)**: Reactividad de última generación.
- **Vite 7**: El entorno de desarrollo más rápido del ecosistema.
- **Pinia**: Estado centralizado para seguridad y eficiencia.
- **Lucide Icons**: Set de iconos vectoriales consistentes y minimalistas.
- **Teleport & Portals**: Implementación de modales de alto rendimiento.
- **DiceBear API**: Generación de avatares únicos para cada perfil.

---

## 📂 Arquitectura del Proyecto

```bash
src/
├── assets/          # Recursos estéticos (SVG core)
├── components/      
│   ├── BookCard.vue # Tarjetas dinámicas con estados visuales
│   └── BookDetailsModal.vue # Gestión de notas y descripciones (Nuevo!)
├── router/          # Navegación inteligente y guardias
├── stores/          
│   ├── auth/        # Lógica de perfiles y persistencia de sesión
│   └── library.js   # Motor de colecciones y metadatos de usuario
├── views/           
│   ├── auth/        # Portal de acceso minimalista
│   ├── HomeView.vue # Centro de descubrimiento con filtros rápidos
│   └── MyCollectionView.vue # Galería personal del usuario
├── App.vue          # Orquestador visual y Layout
└── style.css        # Sistema de diseño (Tokens, Glass, Animaciones)
```

---

##  Guía de Despegue

1. **Clonar**:
   ```bash
   git clone [url-del-repositorio]
   ```

2. **Preparar Motores (Dependencias)**:
   ```bash
   npm install
   ```

3. **Ignición (Desarrollo)**:
   ```bash
   npm run dev
   ```

4. **Explorar**:
   Coloca en la terminal  `---npx vite --port 5173 `. para acceder a la aplicacion¡Usa usuario libre y contraseña `1234`!

---

##  Lógica Interna Destacada

### Gestión de Metadatos de Usuario
Hemos extendido la capacidad de la librería para que no solo guarde el libro, sino también el sentimiento del usuario:

```javascript
// src/stores/library.js
updateBookMetadata(bookId, updates) {
  const index = this.myCollection.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    this.myCollection[index] = { ...this.myCollection[index], ...updates };
    this.saveCollection();
  }
}
```

### Animaciones Escalonadas
Para que la interfaz no se sienta estática, implementamos retardos en las animaciones:
```css
.animate-fade-in-delayed {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.4s;
}
```

---

## � Autor
**Ronald Garavito Zapata** 
**Samuel Doria**
**Daniel Figueroa**
**Elkin Martinez**



---

## 📄 Licencia
Distribuido bajo la Licencia MIT. ¡Siéntete libre de bifurcar, explorar y crear!
