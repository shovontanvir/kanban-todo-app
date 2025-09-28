import { onDragOver, onDragLeave, onDrop } from "@/lib/dragAndDropUtils";
import TaskCard from "./TaskCard";

interface TaskDropZoneProps {
  keyTitle: string;
  tasks: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
  }>;
}

const TaskDropZone = ({ keyTitle, tasks }: TaskDropZoneProps) => {
  return (
    <div
      className="my-2 px-1 py-2 bg-[#373737] rounded-md dropzone"
      id={`dropzone-${keyTitle}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{ minHeight: 100 }}
    >
      {!tasks.length && (
        <p className="text-center text-white italic my-5">No tasks available</p>
      )}
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          id={task._id}
          title={task.title}
          description={task.description}
          status={task.status}
          deadline={new Date(task.deadline).toISOString().slice(0, 10)}
        />
      ))}
    </div>
  );
};

export default TaskDropZone;
