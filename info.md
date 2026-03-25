# EDU Platform — Información general

EDU Platform es una vercion demo para una  plataforma web educativa orientada a colegios y escuelas   que centraliza **academia**, **comunicación**, **calendario** y **gestión administrativa/financiera** en un solo lugar, con paneles por rol.

---

## Propósito

- Unificar la información académica (notas, asistencia, tareas, desempeño).
- Facilitar la comunicación entre institución, docentes, estudiantes y representantes.
- Dar visibilidad y control de pagos, gastos e historial administrativo.
- Mejorar la experiencia con UI moderna, responsive y personalizable por tema.

---

## Roles y accesos

- **Estudiante**
  - Resumen de rendimiento, tareas, horario/calendario, biblioteca digital, analíticas, logros y chat.
- **Profesor**
  - Gestión de clases, tareas, calificaciones, recursos, horario y generación de reportes.
- **Representante (padres)**
  - Seguimiento académico del representado, alertas, calendario, representantes del curso/colegio y módulo financiero (gastos/egresos/ingresos).
- **Administrador**
  - Vista general del colegio, gestión de estudiantes/profesores/clases, reportes y configuración.

---

## Módulos principales

- **Académico**
  - Promedios, calificaciones recientes, desempeño y visualizaciones.
  - Asistencia (porcentaje y vista detallada por día/materia en representante).
  - Pendientes organizados por materia (pruebas/deberes/proyectos).
- **Calendario**
  - Eventos académicos, reuniones, actividades y recordatorios.
  - En representante: pestañas tipo agenda + pagos del mes.
- **Comunicación**
  - Comunicados, mensajes y feed de comunicación.
  - Alertas automáticas del “Sistema EDU” cuando falte información crítica.
- **Financiero**
  - Resumen: ingresos, gastos, balance y pendientes.
  - Historial de transacciones y registro de nuevos movimientos (UI lista para conectar a backend).
- **Temas (UI)**
  - Temas globales por cuenta, persistentes con `localStorage`.

---

## Experiencia del Representante (destacado)

En el dashboard del representante se añadieron funcionalidades enfocadas en control y prevención:

- **Alertas automáticas** (aparecen como notificaciones del “Sistema EDU”):
  - Falta de calificaciones recientes.
  - Sin registro de asistencia o asistencia baja.
  - Varias tareas pendientes.
- **Asistencia por día y materia**
  - Tabla semanal que muestra estado por día (concepto listo para datos reales).
- **Tareas y evaluaciones por materia**
  - Agrupación por materia y clasificación creativa (prueba/deber/proyecto) por heurística del título.

---

## Arquitectura (resumen)

EDU está organizada por capas para mantener el código escalable:

- `components/`: UI (Shadcn/ui + dashboards)
- `hooks/`: estado y orquestación (ej. `useAcademic`, `useFinancial`)
- `services/`: lógica de dominio/data layer (ej. `AcademicService`, `FinancialService`, `CalendarService`, `CommunicationService`)
- `types/`: modelos y tipos globales TypeScript
- `constants/`: catálogos/configuración (temas, categorías, reglas)
- `utils/`: utilidades puras (formatters/validators)
- `lib/`: datos simulados (mocks) listos para migrar a API real

---

## Datos actuales (estado del proyecto)

- La app usa **datos simulados** para mostrar la experiencia completa.
- Los servicios y hooks están preparados para migrar a:
  - API real (REST/GraphQL)
  - Base de datos (PostgreSQL/MySQL)
  - Autenticación y permisos (RBAC por rol)

---

## Siguientes pasos recomendados (si se quiere escalar)

- Conectar `services/` a endpoints reales (`/api/...`) y persistir en DB.
- Centro de notificaciones real (in-app + push).
- Exportación de reportes (PDF/CSV) y boletines por período.
- Pagos reales con pasarela (Stripe/Paymentez) y conciliación.

