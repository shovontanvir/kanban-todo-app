import { TASKTYPES } from "@/lib/consts/taskTypes";
import type { TaskType } from "@/types/taskType";
import React from "react";
import TaskTypeTitle from "./partials/TaskTypeTitle";
import TaskDropZone from "./partials/TaskDropZone";
import TaskAddDialog from "./partials/TaskAddDialog";
import { useCheckNearDeadlineTasks } from "@/hooks/useCheckNearDeadlineTasks";
import { useGetTasks } from "@/hooks/useGetTasks";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface TaskBoardProps {
  checkDeadlineNearTasks: (ids: string[]) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ checkDeadlineNearTasks }) => {
  const { data, isLoading, error } = useGetTasks();

  const navigate = useNavigate();

  useCheckNearDeadlineTasks(data, checkDeadlineNearTasks);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    toast.error("Error fetching tasks. Please try again.");
    navigate("/login");
    return null;
  }

  return (
    <>
      <TaskAddDialog />
      <div className="w-full h-full overflow-x-auto hide-scrollbar flex flex-nowrap">
        {TASKTYPES.map((taskType: TaskType) => (
          <div
            className="min-w-1/6 px-1 py-2"
            key={`column-${taskType.keyTitle}`}
          >
            <div className={`bg-[#171717] h-full max-h-full rounded-md p-2`}>
              <TaskTypeTitle
                keyTitle={taskType.keyTitle}
                name={taskType.name}
              />
              <TaskDropZone
                keyTitle={taskType.keyTitle}
                tasks={data?.data?.filter(
                  (task: {
                    _id: string;
                    title: string;
                    description: string;
                    status: string;
                    deadline: string;
                  }) => task.status === taskType.keyTitle
                )}
                allTasks={data?.data}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
