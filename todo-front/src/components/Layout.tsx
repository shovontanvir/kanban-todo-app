import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import { Toaster } from "./ui/sonner";

type LayoutProps = {
  children:
    | React.ReactElement<{ checkDeadlineNearTasks?: (tasks: string[]) => void }>
    | React.ReactElement<{
        checkDeadlineNearTasks?: (tasks: string[]) => void;
      }>[];
};

export default function Layout({ children }: LayoutProps) {
  const [nearDeadlineTasks, setNearDeadlineTasks] = useState<string[]>([]);

  const handleNearDeadlineTasks = (tasks: string[]) => {
    setNearDeadlineTasks(tasks);
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          checkDeadlineNearTasks: handleNearDeadlineTasks,
        })
      : child
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="ml-auto">
              <Navbar nearDeadlineTasks={nearDeadlineTasks} />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full">
          {childrenWithProps}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
