import { onDragOver, onDragLeave, onDrop } from "@/lib/dragAndDropUtils";

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
      <h1 className="text-white">dropzone-{keyTitle}</h1>
    </div>
  );
};

export default TaskDropZone;
