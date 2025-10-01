import { onDragOver, onDragLeave, onDrop } from "@/lib/dragAndDropUtils";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useUpdateTask } from "@/hooks/useUpdateTask";

interface TaskDropZoneProps {
  keyTitle: string;
  tasks: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
  }>;
  allTasks: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
  }>;
  categories: Array<{ _id: string; keyTitle: string; name: string }>;
}

const TaskDropZone = ({
  keyTitle,
  tasks,
  allTasks,
  categories,
}: TaskDropZoneProps) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { mutate } = useUpdateTask(() => {});

  const getTaskById = (taskId: string) => {
    return allTasks.find((t) => t._id === taskId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    const task = getTaskById(taskId);

    if (task) {
      if (task?.status === keyTitle) {
        setIsDragOver(false);
        return;
      }

      if (task?.status !== keyTitle) {
        setIsDragOver(false);
        mutate({
          id: taskId,
          data: {
            title: task?.title,
            description: task?.description,
            status: keyTitle,
          },
        });
      }
    }
  };

  return (
    <>
      {isDragOver && (
        <div className="text-center text-white py-4 font-semibold">
          Drop the task here
        </div>
      )}
      <div
        className="my-2 px-1 py-2 bg-[#373737] rounded-md dropzone min-h-full"
        id={`dropzone-${keyTitle}`}
        onDragOver={(e) => onDragOver(e, () => setIsDragOver(true))}
        onDragLeave={(e) => onDragLeave(e, () => setIsDragOver(false))}
        onDrop={(e) => onDrop(e, () => handleDrop(e))}
      >
        {!tasks.length && (
          <p className="text-center text-white italic my-5">
            No tasks available
          </p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            deadline={task.deadline}
            draggedTaskId={draggedTaskId ?? ""}
            setDraggedTaskId={setDraggedTaskId}
            categories={categories}
          />
        ))}
      </div>
    </>
  );
};

export default TaskDropZone;
