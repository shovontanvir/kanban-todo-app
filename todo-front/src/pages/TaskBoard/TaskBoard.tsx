import { TASKTYPES } from "@/lib/consts/taskTypes";
import type { TaskType } from "@/types/taskType";
import React from "react";
import TaskTypeTitle from "./partials/TaskTypeTitle";
import TaskDropZone from "./partials/TaskDropZone";
import TaskAddDialog from "./partials/TaskAddDialog";

const TaskBoard: React.FC = () => {
  return (
    <>
      <TaskAddDialog />
      <div className="w-full h-full overflow-x-auto hide-scrollbar flex flex-nowrap">
        {TASKTYPES.map((taskType: TaskType) => (
          <div
            className="min-w-1/6 px-1 py-2"
            key={`column-${taskType.keyTitle}`}
          >
            <div
              className={`bg-[#171717] min-h-full max-h-full rounded-md p-2`}
            >
              <TaskTypeTitle
                keyTitle={taskType.keyTitle}
                name={taskType.name}
              />
              <TaskDropZone keyTitle={taskType.keyTitle} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
