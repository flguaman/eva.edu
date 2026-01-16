import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Communication {
  id: number;
  sender: string;
  message: string;
}

interface CommunicationFeedProps {
  communications: Communication[];
}

export function CommunicationFeed({ communications }: CommunicationFeedProps) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Comunicación</h2>
        <div className="flex flex-col gap-2">
          {communications.map((communication) => (
            <div key={communication.id} className="flex items-center gap-2">
              <p className="font-semibold">{communication.sender}:</p>
              <p>{communication.message}</p>
            </div>
          ))}
          <Button size="sm">Ver todos los mensajes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
