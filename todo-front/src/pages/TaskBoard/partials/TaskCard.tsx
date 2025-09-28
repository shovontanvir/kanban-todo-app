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
import type React from "react";

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
  const statusHandler = (status: string) => {
    return (
      TASKTYPES.find((type) => type.keyTitle === status)?.name || "Unknown"
    );
  };
  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab my-4 bg-[#171717]/60 border border-white/50"
      id={id}
    >
      <CardHeader className="px-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <CardDescription>
          <p className="my-1">{description}</p>
          <p className="my-1 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            {statusHandler(status)}
          </p>
          <p className="my-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {deadline}
          </p>
        </CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TaskCard;
