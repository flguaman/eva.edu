import { Card, CardContent } from "@/components/ui/card";
import { useAcademic } from "@/hooks";

export function AttendanceCard() {
  const { studentData, loading } = useAcademic();
  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold">Asistencia</h2>
          <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold">Asistencia</h2>
        <p className="text-4xl font-bold">{studentData?.stats.attendance || 0}%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {studentData?.stats.attendance >= 90 ? 'Excelente' :
           studentData?.stats.attendance >= 80 ? 'Buena' : 'Requiere atención'}
        </p>
      </CardContent>
    </Card>
  );
}
