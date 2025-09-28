import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TASKTYPES } from "@/lib/consts/taskTypes";
import { Calendar } from "lucide-react";

interface TaskDetailsSheetProps {
  title: string;
  description: string;
  deadline: string;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const TaskDetailsSheet: React.FC<TaskDetailsSheetProps> = ({
  title,
  description,
  deadline,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          See Details
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md w-full bg-black p-5 ">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-3xl font-bold capitalize">{title}</h1>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <p className="text-base mb-4 capitalize">{description}</p>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Task Type</label>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              disabled
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black">
                {TASKTYPES.map((type) => (
                  <SelectItem key={type.keyTitle} value={type.keyTitle}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="w-4 h-4" />
            <span>{deadline}</span>
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailsSheet;
