# EDU Platform

**EDU Platform** es una plataforma educativa web moderna que centraliza la gestión académica, comunicación y recursos para colegios. Está pensada para facilitar la interacción entre **administradores**, **docentes**, **estudiantes** y **representantes (padres)**.

> Este README documenta instalación, scripts, arquitectura (services/hooks/types/constants), theming y un roadmap con ideas de crecimiento.

---

## Características principales

- Paneles por rol: Administrador, Representante, Estudiante y Profesor
- Seguimiento académico con gráficas interactivas
- Calendario avanzado de eventos y pagos
- Gestión de representantes del curso y del colegio
- Módulo financiero: gastos, ingresos y reportes
- Biblioteca digital y recursos multimedia
- Responsive, construido con componentes reutilizables
- Temas globales por cuenta (colores) persistentes en `localStorage`
- Alertas automáticas para el representante (falta de notas/asistencia, asistencia baja, múltiples pendientes)
- Vista académica ampliada (representante): asistencia por día/materia y pendientes por materia

## Tecnologías

- Next.js (App Router)
- TypeScript
- React + Shadcn/ui
- Tailwind CSS
- Nivo (visualización de datos)
- React Hook Form + Zod (formularios y validación)

---

## Quick Start (desarrollo)

Recomendado: usa pnpm si lo tienes instalado.

1) Clona el repositorio

```bash
git clone <repository-url>
cd edu-platform
```

2) Instala dependencias

```bash
# con pnpm (recomendado)
pnpm install
# o npm
npm install
```

3) Ejecuta en modo desarrollo

```bash
pnpm dev
# o npm run dev
npm run dev
```

Abre `http://localhost:3000` para ver la app.

## Scripts útiles

- `dev`: Ejecuta el servidor de desarrollo
- `build`: Genera el build de producción
- `start`: Inicia el servidor de producción
- `lint`: Ejecuta linter (ESLint/Prettier si están configurados)
- `format`: Formatea el código (si está configurado)

---

## Estructura del proyecto

```
app/                # Rutas y páginas (Next.js App Router)
components/         # Componentes reutilizables (ui/ y dashboard/)
constants/          # Constantes y configuraciones centralizadas
contexts/           # Contextos globales (ej. Theme)
hooks/              # Hooks personalizados (lógica + estado)
lib/                # Datos mock y utilidades locales (ej: representative-data)
services/           # Servicios por dominio (lógica / data layer)
types/              # Tipos globales TypeScript reutilizables
utils/              # Utilidades (formatters, validators, etc.)
public/             # Assets públicos
styles/             # Estilos globales
```

---

## Arquitectura (visión general)

La app está organizada por capas para mantener **UI separada de lógica** y facilitar el crecimiento:

- **UI / Presentación**: `components/**`
- **Estado y orquestación**: `hooks/**`
- **Dominio / casos de uso**: `services/**`
- **Configuración / catálogos**: `constants/**`
- **Modelos / tipos**: `types/**`
- **Utilidades puras**: `utils/**`
- **Datos simulados**: `lib/**`

### Tipos (`types/`)

Archivo principal: `types/index.ts`.

Incluye (entre otros):
- **Usuarios**: `UserType`, `User`, `Student`, `Teacher`, `Representative`
- **Académico**: `Grade`, `Attendance`, `Assignment`, `Class`, `AcademicPerformance`
- **Finanzas**: `Transaction`, `TransactionType`, `TransactionStatus`, `FinancialSummary`
- **Comunicaciones**: `Communication`, `CommunicationType`
- **Calendario**: `CalendarEvent`, `EventType`, `Priority`
- **Tema**: `Theme`, `ThemeOption`

### Constantes (`constants/`)

Archivo principal: `constants/index.ts`.

Contiene catálogos y configuración reutilizable:
- Temas: `THEMES`, `DEFAULT_THEME`
- Calendario: `MONTHS`, `DAYS_OF_WEEK(_SHORT)`, `EVENT_TYPES`, `PRIORITIES`
- Finanzas: `TRANSACTION_CATEGORIES`, `TRANSACTION_TYPES`, `TRANSACTION_STATUSES`
- Validación: `VALIDATION_RULES`
- Storage: `STORAGE_KEYS`
- API (futuro): `API_ENDPOINTS`, `PAGINATION`

### Servicios (`services/`)

Exports centralizados: `services/index.ts`.

Servicios actuales (data layer / lógica):
- `AcademicService`: datos académicos, cálculo de promedio, métricas (mock).
- `FinancialService`: resumen financiero, filtros, validación, formateo de moneda.
- `CommunicationService`: comunicaciones y representantes (búsquedas y stats).
- `CalendarService`: eventos del calendario (CRUD simulado, stats, formato).

> Nota: hoy los servicios usan datos simulados (ej. `lib/representative-data.ts`). Están listos para migrar a APIs reales sin reescribir la UI.

### Hooks (`hooks/`)

Exports centralizados: `hooks/index.ts`.

Hooks clave:
- `useAcademic`: carga datos académicos y deriva estadísticas.
- `useFinancial`: gestiona transacciones y resumen financiero.

### Utils (`utils/`)

Exports centralizados: `utils/index.ts`.

Utilidades clave:
- `Formatters`: moneda, fechas, porcentajes, texto.
- `Validators`: email, password, teléfono, fechas, rangos.

---

## Temas / colores (global)

- Contexto: `contexts/theme-context.tsx`
- Selector: `components/theme-selector.tsx`
- Variables CSS: `styles/globals.css` (`[data-theme="..."]`)

Persistencia:
- Key: `edu-theme` en `localStorage`
- Aplicación: `document.documentElement.setAttribute("data-theme", theme)`

---

## Dashboard Representante (lógica añadida)

En `components/dashboard/representative/organized-dashboard.tsx` se incluye:

- **Alertas automáticas** (inyectadas como comunicaciones del “Sistema EDU”):
  - Faltan calificaciones recientes.
  - Sin registro de asistencia o asistencia baja.
  - Varias tareas pendientes.
- **Asistencia por día y materia**: tabla semanal (día → materia → estado).
- **Tareas/evaluaciones por materia**: agrupa “pruebas/deberes/proyectos” por heurística del título.

---

## Qué se podría agregar (ideas de crecimiento)

### Backend / datos reales

- Reemplazar mocks (`lib/*-data.ts`) por APIs reales (REST/GraphQL).
- Persistir calendario/transacciones/asistencia en DB (PostgreSQL/MySQL).
- Autenticación real (Auth.js/NextAuth/JWT) y RBAC por rol.

### Notificaciones

- Centro de notificaciones in-app por rol.
- Push notifications (Web Push / Firebase).
- Automatizaciones: recordatorios por pagos, tareas, reuniones, asistencia.

### Académico

- Asistencia real por materia con **justificaciones** y adjuntos.
- Boletines por quimestre/trimestre (PDF).
- Rúbricas por tarea, historial por materia, observaciones docentes.

### Financiero

- Pasarela de pagos (Stripe/Paymentez) y conciliación.
- Estado de cuenta por período y exportación (CSV/PDF).
- Aprobación de gastos y flujo de caja.

### Comunicación

- Canales por curso, adjuntos, confirmación de lectura.
- Comunicados masivos + segmentación (por grado/curso).
- Firma digital de autorizaciones (excursiones, permisos).

### Calidad / DX

- Unit tests (Jest/RTL) y E2E (Playwright).
- CI con GitHub Actions (lint, build, tests).
- Storybook para UI y documentación de componentes.

---

## Deploy

Recomendado: **Vercel** para despliegue inmediato con Next.js. También puedes usar Netlify o cualquier plataforma que soporte Node.js.

## Contribuir

1. Fork del repositorio
2. Crea una branch: `git checkout -b feature/mi-cambio`
3. Haz commits pequeños y claros
4. Abre un Pull Request describiendo los cambios

## Licencia

Si quieres publicar el proyecto, considera añadir una licencia (por ejemplo MIT): crea un archivo `LICENSE`.

---

### ENGLISH SUMMARY

EDU Platform is a modern educational web app built with Next.js and TypeScript. It includes role-based dashboards, theming, and a modular architecture (types/constants/services/hooks). The representative dashboard adds automated academic alerts plus summarized views per subject.
