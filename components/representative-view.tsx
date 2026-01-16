import { representativeData } from "@/lib/representative-data";
import { StudentInfoCard } from "./dashboard/representative/student-info-card";
import { GradesCard } from "./dashboard/representative/grades-card";
import { AttendanceCard } from "./dashboard/representative/attendance-card";
import { EventsCard } from "./dashboard/representative/events-card";
import { AcademicPerformanceChart } from "./dashboard/representative/academic-performance-chart";
import { SubjectsChart } from "./dashboard/representative/subjects-chart";
import { ExtracurricularActivitiesChart } from "./dashboard/representative/extracurricular-activities-chart";
import { CommunicationFeed } from "./dashboard/representative/communication-feed";

export function RepresentativeView() {
  const { 
    student, 
    grades, 
    attendance, 
    events, 
    academicPerformance, 
    subjects, 
    extracurricularActivities, 
    communications 
  } = representativeData;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StudentInfoCard student={student} />
          <GradesCard grades={grades} />
          <AttendanceCard attendance={attendance} />
          <EventsCard events={events} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <AcademicPerformanceChart data={academicPerformance} />
          <SubjectsChart data={subjects} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <ExtracurricularActivitiesChart data={extracurricularActivities} />
          <CommunicationFeed communications={communications} />
        </div>
      </main>
    </div>
  );
}