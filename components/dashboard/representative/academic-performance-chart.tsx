import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { useAcademic } from "@/hooks";

export function AcademicPerformanceChart() {
  const { studentData, loading } = useAcademic();
  // Usar datos simulados por ahora
  const mockData = [
    {
      id: "Desktop",
      data: [
        { x: "Ene", y: 8.2 },
        { x: "Feb", y: 8.5 },
        { x: "Mar", y: 8.1 },
        { x: "Abr", y: 8.8 },
        { x: "May", y: 8.4 },
        { x: "Jun", y: 8.9 },
      ],
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Rendimiento Académico</h2>
          <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Rendimiento Académico</h2>
        <LineChart data={mockData} className="w-full h-[300px]" />
      </CardContent>
    </Card>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={props.data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
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
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
