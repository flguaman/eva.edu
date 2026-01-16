import { Card, CardContent } from "@/components/ui/card";
import { useAcademic } from "@/hooks";

export function StudentInfoCard() {
  const { studentData, loading } = useAcademic();
  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold">Mi Hijo/a</h2>
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!studentData) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold">Mi Hijo/a</h2>
          <p className="text-sm text-gray-500">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold">Mi Hijo/a</h2>
        <p className="text-4xl font-bold">{studentData.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Grado: {studentData.grade}</p>
      </CardContent>
    </Card>
  );
}
