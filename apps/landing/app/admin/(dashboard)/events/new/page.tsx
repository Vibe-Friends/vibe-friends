import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-mono tracking-wider text-white mb-8">Create Event</h1>
      <EventForm />
    </div>
  );
}
