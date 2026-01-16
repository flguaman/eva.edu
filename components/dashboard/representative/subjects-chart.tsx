import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { useAcademic } from "@/hooks";

export function SubjectsChart() {
  const { loading } = useAcademic();
  // Datos simulados de asignaturas
  const mockData = [
    { name: "Matemáticas", desktop: 85 },
    { name: "Ciencias", desktop: 78 },
    { name: "Lengua", desktop: 82 },
    { name: "Historia", desktop: 75 },
    { name: "Arte", desktop: 90 },
    { name: "Ed. Física", desktop: 88 },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Asignaturas</h2>
          <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Asignaturas</h2>
        <div className="w-full h-[300px]">
          <ResponsiveBar
            data={mockData}
            keys={["desktop"]}
            indexBy="name"
            margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
            padding={0.3}
            colors={["#2563eb"]}
            enableLabel={false}
            role="application"
            ariaLabel="A bar chart showing data."
          />
        </div>
      </CardContent>
    </Card>
  );
}
