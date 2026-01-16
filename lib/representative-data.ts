
export const representativeData = {
  student: {
    name: "Juan Pérez",
    grade: "5to",
  },
  grades: {
    average: "85%",
    subject: "Promedio General",
  },
  attendance: {
    percentage: "95%",
    status: "Total Asistido",
  },
  events: [
    { id: 1, description: "Reunión de Padres - 25/03" },
    { id: 2, description: "Excursión al Museo - 02/04" },
  ],
  academicPerformance: [
    {
      id: "Desktop",
      data: [
        { x: "Jan", y: 43 },
        { x: "Feb", y: 137 },
        { x: "Mar", y: 61 },
        { x: "Apr", y: 145 },
        { x: "May", y: 26 },
        { x: "Jun", y: 154 },
      ],
    },
    {
      id: "Mobile",
      data: [
        { x: "Jan", y: 60 },
        { x: "Feb", y: 48 },
        { x: "Mar", y: 177 },
        { x: "Apr", y: 78 },
        { x: "May", y: 96 },
        { x: "Jun", y: 204 },
      ],
    },
  ],
  subjects: [
    { name: "Matemáticas", desktop: 111 },
    { name: "Ciencias", desktop: 157 },
    { name: "Lengua", desktop: 129 },
    { name: "Historia", desktop: 150 },
    { name: "Arte", desktop: 119 },
    { name: "Ed. Física", desktop: 72 },
  ],
  extracurricularActivities: [
    { id: "Fútbol", value: 111 },
    { id: "Básquet", value: 157 },
    { id: "Ajedrez", value: 129 },
    { id: "Música", value: 150 },
    { id: "Pintura", value: 119 },
  ],
  communications: [
    {
      id: 1,
      sender: "Prof. García",
      message: "Felicitaciones por el excelente trabajo de Juan en el proyecto de ciencias.",
      title: "Felicitación académica",
      type: "Positivo",
      date: "Hace 2 días"
    },
    {
      id: 2,
      sender: "Secretaría",
      message: "Recordatorio: La próxima semana no habrá clases el día viernes.",
      title: "Aviso administrativo",
      type: "Información",
      date: "Hace 1 día"
    },
    {
      id: 3,
      sender: "Representante de Curso",
      message: "Próxima reunión de representantes el próximo jueves a las 3:00 PM.",
      title: "Reunión de representantes",
      type: "Reunión",
      date: "Hace 5 horas"
    },
  ],
  representatives: [
    {
      id: "1",
      name: "María González",
      role: "Representante Principal",
      type: "course",
      grade: "5to Básico A",
      email: "maria.gonzalez@email.com",
      phone: "+593 987654321",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      role: "Sub-representante",
      type: "course",
      grade: "5to Básico A",
      email: "carlos.rodriguez@email.com",
      phone: "+593 987654322",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: "3",
      name: "Ana Martínez",
      role: "Presidenta Asociación",
      type: "college",
      email: "ana.martinez@email.com",
      phone: "+593 987654323",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: "4",
      name: "Luis Sánchez",
      role: "Tesorero",
      type: "college",
      email: "luis.sanchez@email.com",
      phone: "+593 987654324",
      avatar: "/placeholder-user.jpg"
    },
  ],
  transactions: [
    {
      id: "1",
      type: "expense",
      amount: 150,
      description: "Mensualidad escolar - Enero 2024",
      category: "school_fees",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "2",
      type: "expense",
      amount: 75,
      description: "Compra de materiales escolares",
      category: "materials",
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: "3",
      type: "expense",
      amount: 25,
      description: "Actividad extracurricular - Fútbol",
      category: "activities",
      date: "2024-01-08",
      status: "completed"
    },
    {
      id: "4",
      type: "income",
      amount: 50,
      description: "Reembolso de actividad cancelada",
      category: "refund",
      date: "2024-01-20",
      status: "completed"
    },
    {
      id: "5",
      type: "expense",
      amount: 200,
      description: "Mensualidad escolar - Febrero 2024",
      category: "school_fees",
      date: "2024-02-15",
      status: "pending"
    },
    {
      id: "6",
      type: "expense",
      amount: 30,
      description: "Transporte escolar",
      category: "transport",
      date: "2024-01-25",
      status: "completed"
    }
  ],
};
