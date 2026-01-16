import { Theme, ThemeOption, UserType, TransactionCategory, EventType, CommunicationType, Priority } from '@/types';

// ========== THEME CONSTANTS ==========
export const THEMES: ThemeOption[] = [
  { id: "blue", name: "Azul Brillante", color: "bg-blue-500" },
  { id: "green", name: "Verde Vibrante", color: "bg-green-500" },
  { id: "purple", name: "Púrpura Intenso", color: "bg-purple-500" },
  { id: "orange", name: "Naranja Explosivo", color: "bg-orange-500" },
  { id: "dark", name: "Modo Oscuro", color: "bg-gray-800" },
];

export const DEFAULT_THEME: Theme = "blue";

// ========== USER TYPE CONSTANTS ==========
export const USER_TYPES: { value: UserType; label: string; icon: string; description: string }[] = [
  {
    value: 'student',
    label: 'Estudiante',
    icon: 'User',
    description: 'Acceso a cursos y tareas'
  },
  {
    value: 'teacher',
    label: 'Profesor',
    icon: 'GraduationCap',
    description: 'Gestión de clases'
  },
  {
    value: 'admin',
    label: 'Administrador',
    icon: 'Shield',
    description: 'Control total'
  },
  {
    value: 'representative',
    label: 'Representante',
    icon: 'User',
    description: 'Seguimiento de alumnos'
  }
];

// ========== ACADEMIC CONSTANTS ==========
export const GRADES = [
  '1ro EGB', '2do EGB', '3ro EGB', '4to EGB', '5to EGB', '6to EGB', '7mo EGB',
  '8vo EGB', '9no EGB', '10mo EGB', '1ro Bachillerato', '2do Bachillerato', '3ro Bachillerato'
];

export const SUBJECTS = [
  'Matemáticas', 'Lengua y Literatura', 'Ciencias Naturales', 'Estudios Sociales',
  'Inglés', 'Educación Física', 'Artes Plásticas', 'Música', 'Informática', 'Filosofía'
];

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const DAYS_OF_WEEK = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const DAYS_OF_WEEK_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// ========== FINANCIAL CONSTANTS ==========
export const TRANSACTION_CATEGORIES: { value: TransactionCategory; label: string; icon: string }[] = [
  { value: 'school_fees', label: 'Cuotas Escolares', icon: 'DollarSign' },
  { value: 'materials', label: 'Materiales', icon: 'BookOpen' },
  { value: 'activities', label: 'Actividades', icon: 'Star' },
  { value: 'transport', label: 'Transporte', icon: 'MapPin' },
  { value: 'refund', label: 'Reembolsos', icon: 'RefreshCw' },
  { value: 'other', label: 'Otros', icon: 'MoreHorizontal' }
];

export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Ingreso', color: 'text-green-600' },
  { value: 'expense', label: 'Gasto', color: 'text-red-600' }
] as const;

export const TRANSACTION_STATUSES = [
  { value: 'pending', label: 'Pendiente', color: 'text-orange-600' },
  { value: 'completed', label: 'Completado', color: 'text-green-600' },
  { value: 'cancelled', label: 'Cancelado', color: 'text-gray-600' }
] as const;

// ========== EVENT CONSTANTS ==========
export const EVENT_TYPES: { value: EventType; label: string; icon: string; color: string }[] = [
  { value: 'academic', label: 'Académico', icon: 'BookOpen', color: 'bg-blue-100 text-blue-800' },
  { value: 'exam', label: 'Examen', icon: 'AlertCircle', color: 'bg-red-100 text-red-800' },
  { value: 'assignment', label: 'Tarea', icon: 'FileText', color: 'bg-blue-100 text-blue-800' },
  { value: 'payment', label: 'Pago', icon: 'DollarSign', color: 'bg-green-100 text-green-800' },
  { value: 'meeting', label: 'Reunión', icon: 'Users', color: 'bg-purple-100 text-purple-800' },
  { value: 'activity', label: 'Actividad', icon: 'Star', color: 'bg-orange-100 text-orange-800' },
  { value: 'holiday', label: 'Feriado', icon: 'Calendar', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'reminder', label: 'Recordatorio', icon: 'Bell', color: 'bg-gray-100 text-gray-800' },
  { value: 'class', label: 'Clase', icon: 'GraduationCap', color: 'bg-green-100 text-green-800' }
];

export const PRIORITIES: { value: Priority; label: string; color: string; borderColor: string }[] = [
  { value: 'low', label: 'Baja', color: 'text-green-600', borderColor: 'border-l-green-500' },
  { value: 'medium', label: 'Media', color: 'text-yellow-600', borderColor: 'border-l-yellow-500' },
  { value: 'high', label: 'Alta', color: 'text-red-600', borderColor: 'border-l-red-500' }
];

// ========== COMMUNICATION CONSTANTS ==========
export const COMMUNICATION_TYPES: { value: CommunicationType; label: string; color: string }[] = [
  { value: 'general', label: 'General', color: 'bg-blue-100 text-blue-800' },
  { value: 'academic', label: 'Académico', color: 'bg-green-100 text-green-800' },
  { value: 'administrative', label: 'Administrativo', color: 'bg-purple-100 text-purple-800' },
  { value: 'meeting', label: 'Reunión', color: 'bg-orange-100 text-orange-800' },
  { value: 'positive', label: 'Positivo', color: 'bg-green-100 text-green-800' },
  { value: 'warning', label: 'Advertencia', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' }
];

// ========== UI CONSTANTS ==========
export const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// ========== API CONSTANTS ==========
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh'
  },
  students: {
    list: '/api/students',
    detail: (id: string) => `/api/students/${id}`,
    grades: (id: string) => `/api/students/${id}/grades`,
    attendance: (id: string) => `/api/students/${id}/attendance`
  },
  teachers: {
    list: '/api/teachers',
    detail: (id: string) => `/api/teachers/${id}`,
    classes: (id: string) => `/api/teachers/${id}/classes`
  },
  representatives: {
    list: '/api/representatives',
    detail: (id: string) => `/api/representatives/${id}`,
    communications: '/api/communications'
  },
  financial: {
    transactions: '/api/financial/transactions',
    summary: '/api/financial/summary'
  },
  calendar: {
    events: '/api/calendar/events',
    create: '/api/calendar/events'
  }
} as const;

// ========== PAGINATION CONSTANTS ==========
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZES: [5, 10, 20, 50, 100]
} as const;

// ========== VALIDATION CONSTANTS ==========
export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    minLength: 7,
    maxLength: 15
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  }
} as const;

// ========== TIME CONSTANTS ==========
export const TIME_FORMATS = {
  DATE: 'DD/MM/YYYY',
  TIME: 'HH:mm',
  DATETIME: 'DD/MM/YYYY HH:mm',
  ISO_DATE: 'YYYY-MM-DD',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ssZ'
} as const;

export const TIME_ZONES = {
  ECUADOR: 'America/Guayaquil',
  UTC: 'UTC'
} as const;

// ========== STORAGE KEYS ==========
export const STORAGE_KEYS = {
  THEME: 'eva-theme',
  USER: 'eva-user',
  TOKEN: 'eva-token',
  REFRESH_TOKEN: 'eva-refresh-token',
  SETTINGS: 'eva-settings'
} as const;

// ========== ERROR MESSAGES ==========
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Los datos proporcionados no son válidos.',
  SERVER_ERROR: 'Error interno del servidor. Inténtalo de nuevo más tarde.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.'
} as const;

// ========== SUCCESS MESSAGES ==========
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente.',
  SAVE_SUCCESS: 'Datos guardados correctamente.',
  DELETE_SUCCESS: 'Elemento eliminado correctamente.',
  UPDATE_SUCCESS: 'Datos actualizados correctamente.'
} as const;
