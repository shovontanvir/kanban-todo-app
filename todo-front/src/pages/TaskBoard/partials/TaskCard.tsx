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

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  deadline,
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
      onDragStart={handleDragStart}
      className="cursor-grab my-4 bg-[#171717]/60 text-center border border-white/50"
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
          <p className="my-1 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            {deadline}
          </p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <TaskDetailsSheet
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
