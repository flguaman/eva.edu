// ========== USER TYPES ==========
export type UserType = 'student' | 'teacher' | 'admin' | 'representative';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

export interface Student extends User {
  type: 'student';
  grade: string;
  studentId: string;
}

export interface Teacher extends User {
  type: 'teacher';
  subject: string;
  classes: number;
}

export interface Representative extends User {
  type: 'representative';
  role: string;
  grade?: string;
}

// ========== ACADEMIC TYPES ==========
export interface Grade {
  subject: string;
  grade: number;
  date: string;
  teacher?: string;
}

export interface Subject {
  name: string;
  desktop: number;
  mobile?: number;
}

export interface Attendance {
  percentage: string;
  status: string;
  totalDays?: number;
  presentDays?: number;
}

export interface AcademicPerformance {
  id: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

// ========== FINANCIAL TYPES ==========
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'completed' | 'cancelled';
export type TransactionCategory =
  | 'school_fees'
  | 'materials'
  | 'activities'
  | 'transport'
  | 'refund'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  pendingTransactions: number;
}

// ========== CALENDAR & EVENTS TYPES ==========
export type EventType =
  | 'academic'
  | 'payment'
  | 'meeting'
  | 'activity'
  | 'holiday'
  | 'reminder'
  | 'exam'
  | 'assignment'
  | 'class';

export type Priority = 'low' | 'medium' | 'high';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: EventType;
  category?: string;
  location?: string;
  priority: Priority;
  completed?: boolean;
  amount?: number;
  subject?: string;
}

// ========== COMMUNICATION TYPES ==========
export type CommunicationType =
  | 'general'
  | 'academic'
  | 'administrative'
  | 'meeting'
  | 'positive'
  | 'warning'
  | 'urgent';

export interface Communication {
  id: number;
  sender: string;
  message: string;
  title?: string;
  type: CommunicationType;
  date: string;
  read?: boolean;
  priority?: Priority;
}

// ========== REPRESENTATIVE TYPES ==========
export type RepresentativeType = 'course' | 'college';

export interface RepresentativeMember {
  id: string;
  name: string;
  role: string;
  type: RepresentativeType;
  grade?: string;
  email: string;
  phone: string;
  avatar?: string;
}

// ========== EXTRACURRICULAR TYPES ==========
export interface ExtracurricularActivity {
  id: string;
  name: string;
  value: number;
  category?: string;
  description?: string;
}

// ========== CHART DATA TYPES ==========
export interface ChartDataPoint {
  x: string;
  y: number;
  label?: string;
}

export interface ChartSeries {
  id: string;
  data: ChartDataPoint[];
  color?: string;
}

// ========== THEME TYPES ==========
export type Theme = "blue" | "green" | "purple" | "orange" | "dark";

export interface ThemeOption {
  id: Theme;
  name: string;
  color: string;
}

// ========== DASHBOARD DATA TYPES ==========
export interface StudentStats {
  overallAverage: number;
  attendance: number;
  completedAssignments: number;
  totalAssignments: number;
  ranking: number;
  totalStudents: number;
}

export interface StudentData {
  name: string;
  grade: string;
  studentId: string;
  photo?: string;
  stats: StudentStats;
  recentGrades: Grade[];
  upcomingAssignments: Assignment[];
  schedule: Class[];
  notifications: Notification[];
}

export interface Assignment {
  id?: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  description?: string;
  status?: 'pending' | 'completed' | 'overdue';
}

export interface Class {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  day?: string;
}

export interface Notification {
  type: 'assignment' | 'grade' | 'event' | 'message';
  message: string;
  time: string;
  read?: boolean;
}

export interface Event {
  id: number;
  description: string;
  date?: string;
  type?: string;
}

// ========== API RESPONSE TYPES ==========
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ========== FORM TYPES ==========
export interface LoginForm {
  userType: UserType;
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  name: string;
  confirmPassword: string;
  grade?: string;
  subject?: string;
}

// ========== COMPONENT PROPS TYPES ==========
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
}

// ========== UTILITY TYPES ==========
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];

// ========== CONSTANTS TYPES ==========
export interface AppConfig {
  name: string;
  version: string;
  apiUrl: string;
  theme: {
    default: Theme;
    options: ThemeOption[];
  };
  pagination: {
    defaultLimit: number;
    maxLimit: number;
  };
}
