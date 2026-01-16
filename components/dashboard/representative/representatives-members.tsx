import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

interface RepresentativeMember {
  id: string;
  name: string;
  role: string;
  type: 'course' | 'college';
  grade?: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface RepresentativesMembersProps {
  members: RepresentativeMember[];
}

export function RepresentativesMembers({ members }: RepresentativesMembersProps) {
  const courseMembers = members.filter(member => member.type === 'course');
  const collegeMembers = members.filter(member => member.type === 'college');

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Representantes del Curso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Representantes del Curso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courseMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {member.role}
                    </Badge>
                    {member.grade && (
                      <span className="text-xs text-gray-500">{member.grade}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Representantes del Colegio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Representantes del Colegio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {collegeMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.role}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
