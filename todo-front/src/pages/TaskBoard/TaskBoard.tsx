import type { TaskType } from "@/types/taskType";
import React from "react";
import TaskTypeTitle from "./partials/TaskTypeTitle";
import TaskDropZone from "./partials/TaskDropZone";
import { useCheckNearDeadlineTasks } from "@/hooks/useCheckNearDeadlineTasks";
import { useGetTasks } from "@/hooks/useGetTasks";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";

interface TaskBoardProps {
  checkDeadlineNearTasks: (ids: string[]) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ checkDeadlineNearTasks }) => {
  const { data, isLoading, error } = useGetTasks();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategories();

  const navigate = useNavigate();

  useCheckNearDeadlineTasks(data, checkDeadlineNearTasks);

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;

  if (error || isCategoriesError) {
    toast.error("Error fetching tasks. Please try again.");
    navigate("/login");
    return null;
  }

  console.log(data);

  return (
    <>
      <div className="w-full h-full overflow-x-auto hide-scrollbar flex flex-nowrap">
        {categories?.data.map((taskType: TaskType) => (
          <div className="min-w-1/6 px-1 py-2" key={taskType._id}>
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
                categories={categories?.data || []}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
