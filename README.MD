# Frontend - Gestión de Camas 🟩🟥🟨🟦⛔

Este módulo corresponde al **frontend del sistema de gestión de camas**.  
Su objetivo es mostrar en tiempo real el estado de las 152 camas disponibles en hospitales, con KPIs de ocupación, rotación y tiempos de espera.

---

## 🚀 Stack Tecnológico

- **Framework:** React + Next.js (PWA)
- **Librerías:** axios (API calls), chart.js/recharts (KPIs), react-table/grid (tablas)
- **Estado global:** Context API
- **Tiempo real:** WebSockets (Socket.IO) o polling

---

## 📂 Estructura de Carpetas

```plaintext
/src
  /components   # Ej: BedCard, KPIBox, FloorSection
  /pages        # Dashboard principal, vista por piso
  /hooks        # useFetchCamas, useWebSocket
  /context      # Estado global (usuario, camas, KPIs)
  /services     # Consumo de APIs backend
/public
  /assets
    /images     # Logos, ilustraciones
    /icons      # SVGs personalizados
  /styles       # CSS global, variables de colores
  /fonts        # Tipografías externas
README.md       # Documentación general del frontend
```

---

## 📊 Reglas de Negocio

- **Colores de estado:**
  - 🟩 Libre
  - 🟥 Ocupada
  - 🟨 Limpieza
  - 🟦 Reservada
  - ⛔ Bloqueada
- El frontend **no gestiona altas de pacientes**, solo muestra estados y permite marcar mantenimiento.
- Los KPIs deben calcularse y mostrarse por piso: % ocupación, camas libres, rotación promedio.

---

## 🧭 Buenas Prácticas y Reglas

- Cada carpeta debe tener su propio README con detalles específicos.
- Los componentes deben estar documentados con props y ejemplos de uso.
- No mezclar lógica de negocio en componentes: usar `services` y `hooks`.
- Los assets deben tener nombres descriptivos y consistentes (ej: `bed-occupied.svg`).
- Importar imágenes desde `/public/assets`.
- No subir imágenes mayores a 1MB, preferir SVG para íconos.
- Los colores de estado deben ser consistentes en toda la app.

---

## 🛠️ Instrucciones de Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Construir para producción:
   ```bash
   npm run build
   ```

---

## 📚 Notas de Desarrollo

- **/components:** Cada componente debe tener sus props documentadas y ejemplos de uso.
- **/pages:** Cada página debe consumir servicios, no tener lógica directa. Usar routing de Next.js.
- **/hooks:** Documentar cada hook (qué hace, qué devuelve). Ejemplo: `useFetchCamas` devuelve lista de camas y estado de carga.
- **/context:** Solo guarda estado global (usuario, camas, KPIs). Usar React Context API.
- **/services:** Documentar endpoints consumidos, manejar errores con try/catch, usar axios. Ejemplo: `GET /camas` devuelve JSON agrupado por piso.

 
