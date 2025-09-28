import { onDragOver, onDragLeave, onDrop } from "@/lib/dragAndDropUtils";
import TaskCard from "./TaskCard";

interface TaskDropZoneProps {
  keyTitle: string;
}

const TaskDropZone = ({ keyTitle }: TaskDropZoneProps) => {
  return (
    <div
      className="my-2 px-1 py-2 bg-[#373737] rounded-md dropzone"
      id={`dropzone-${keyTitle}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{ minHeight: 100 }}
    >
      <TaskCard
        id="1"
        title="Sample Task 1"
        description="This is a sample task."
        status={keyTitle}
        deadline="2024-12-31"
      />
      <TaskCard
        id="2"
        title="Sample Task 2"
        description="This is another sample task."
        status={keyTitle}
        deadline="2024-12-31"
      />
    </div>
  );
};

export default TaskDropZone;
