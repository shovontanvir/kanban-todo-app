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
  categories: Array<{
    name: string;
    keyTitle: string;
  }>;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ checkDeadlineNearTasks }) => {
  const { data, isLoading, error } = useGetTasks();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategories();

  const navigate = useNavigate();

  useCheckNearDeadlineTasks(data, categories, checkDeadlineNearTasks);

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;

  if (error || isCategoriesError) {
    toast.error("Error fetching tasks. Please try again.");
    navigate("/login");
    return null;
  }

  return (
    <>
      <div className="w-full h-[calc(100vh-175px)] overflow-x-auto hide-scrollbar flex flex-nowrap">
        {!categories?.data?.length && (
          <div className="mx-auto text-red-700 text-2xl">
            No categories found. Please add some to create tasks.
          </div>
        )}
        {categories?.data &&
          categories.data.length > 0 &&
          categories?.data.map((taskType: TaskType) => (
            <div className="min-w-2/11 px-1 py-2" key={taskType._id}>
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
