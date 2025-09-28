import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TASKTYPES } from "@/lib/consts/taskTypes";
import { handleDragStart } from "@/lib/dragAndDropUtils";
import { Calendar, BadgeCheck } from "lucide-react";
import TaskDetailsSheet from "./TaskDetailsSheet";
import { isTomorrow } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline?: string;
  draggedTaskId: string;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  deadline,
  draggedTaskId,
  setDraggedTaskId,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const statusHandler = (status: string) => {
    return (
      TASKTYPES.find((type) => type.keyTitle === status)?.name || "Unknown"
    );
  };

  return (
    <Card
      draggable
      onDragStart={(e) => {
        handleDragStart(e, id);
        setDraggedTaskId(id);
      }}
      onDragEnd={() => setDraggedTaskId(null)}
      className={`cursor-grab my-4 bg-[#171717]/60 text-center border border-white/50 ${
        draggedTaskId === id ? "opacity-30" : "opacity-100"
      }`}
      id={id}
    >
      <CardHeader className="px-2">
        <CardTitle className="text-lg font-semibold capitalize">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <CardDescription>
          <p className="mb-5">{description}</p>
          <p className="my-1 flex items-center justify-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            {statusHandler(status)}
          </p>
          <p
            className={`my-1 flex items-center justify-center gap-2 ${
              isTomorrow(new Date(deadline ?? "")) &&
              "text-red-600 border border-red-600 rounded-md py-1"
            }`}
          >
            <Calendar className="w-4 h-4" />
            {deadline
              ? new Date(deadline).toISOString().slice(0, 10)
              : "No deadline"}
          </p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <TaskDetailsSheet
          id={id}
          title={title}
          description={description}
          deadline={deadline ?? ""}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
