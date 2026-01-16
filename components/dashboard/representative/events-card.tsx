import { Card, CardContent } from "@/components/ui/card";
import { CalendarService } from "@/services";
import { useEffect, useState } from "react";

export function EventsCard() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    // En una implementación real, esto vendría de una API
    // Por ahora usamos datos simulados
    setUpcomingEvents([
      { id: 1, description: "Reunión de Padres - 25/03" },
      { id: 2, description: "Excursión al Museo - 02/04" }
    ]);
  }, []);
  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold">Próximos Eventos</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <p key={event.id} className="text-sm">{event.description}</p>
          ))
        ) : (
          <p className="text-sm text-gray-500">No hay eventos próximos</p>
        )}
      </CardContent>
    </Card>
  );
}
