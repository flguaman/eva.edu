import { Card, CardContent } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";
import { useAcademic } from "@/hooks";

export function ExtracurricularActivitiesChart() {
  const { loading } = useAcademic();
  // Datos simulados de actividades extracurriculares
  const mockData = [
    { id: "Fútbol", value: 35, color: "#2563eb" },
    { id: "Básquet", value: 25, color: "#dc2626" },
    { id: "Ajedrez", value: 15, color: "#16a34a" },
    { id: "Música", value: 20, color: "#ca8a04" },
    { id: "Pintura", value: 5, color: "#7c3aed" },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Actividades Extracurriculares</h2>
          <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Actividades Extracurriculares</h2>
        <PieChart data={mockData} className="w-full h-[300px]" />
      </CardContent>
    </Card>
  );
}

function PieChart(props: any) {
  return (
    <div {...props}>
      <ResponsivePie
        data={props.data}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
