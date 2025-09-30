/* eslint-disable no-extra-boolean-cast */
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface NotificationTrayProps {
  nearDeadlineTasks: string[];
}

const NotificationTray: React.FC<NotificationTrayProps> = ({
  nearDeadlineTasks,
}: NotificationTrayProps) => {
  const [open, setOpen] = useState(false);

  if (!!open) {
    setTimeout(() => setOpen(false), 5000);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer" onClick={() => setOpen(true)}>
          <Badge className="h-4 w-4 text-xs rounded-full bg-red-800 px-1 font-mono tabular-nums">
            {nearDeadlineTasks.length}
          </Badge>
          <Bell className="w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[220px] bg-black">
        <Separator />
        <Separator />
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!nearDeadlineTasks.length ? (
          <DropdownMenuItem className="text-muted-foreground">
            No notifications
          </DropdownMenuItem>
        ) : (
          nearDeadlineTasks.map((task, idx) => (
            <React.Fragment key={idx}>
              <DropdownMenuItem className="my-2">
                Task <span className="font-bold text-red-600">{task}</span> is
                near its deadline!
              </DropdownMenuItem>
              <Separator className="my-1" />
            </React.Fragment>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationTray;
