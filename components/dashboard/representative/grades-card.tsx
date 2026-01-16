import { Card, CardContent } from "@/components/ui/card";
import { useAcademic } from "@/hooks";

export function GradesCard() {
  const { studentData, loading, stats } = useAcademic();
  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold">Calificaciones</h2>
          <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold">Calificaciones</h2>
        <p className="text-4xl font-bold">{stats?.currentAverage || studentData?.stats.overallAverage || 'N/A'}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Promedio General</p>
      </CardContent>
    </Card>
  );
}
