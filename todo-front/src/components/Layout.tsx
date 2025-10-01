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
import TaskAddDialog from "@/components/TaskAddDialog";
import CategoryAddDialog from "./CategoryAddDialogue";

type LayoutProps = {
  children:
    | React.ReactElement<{
        checkDeadlineNearTasks?: (
          tasks: string[],
          categoryList?: Array<{ name: string; keyTitle: string }>
        ) => void;
      }>
    | React.ReactElement<{
        checkDeadlineNearTasks?: (
          tasks: string[],
          categoryList?: Array<{ name: string; keyTitle: string }>
        ) => void;
      }>[];
};

export default function Layout({ children }: LayoutProps) {
  const [nearDeadlineTasks, setNearDeadlineTasks] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    Array<{
      name: string;
      keyTitle: string;
    }>
  >([]);

  const handleNearDeadlineTasks = (
    tasks: string[],
    categoryList?: Array<{
      name: string;
      keyTitle: string;
    }>
  ) => {
    setNearDeadlineTasks(tasks);
    setCategories(categoryList || []);
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
        <div className="flex flex-col gap-4 p-5 w-full">
          <div className="flex justify-end items-center w-full">
            <CategoryAddDialog />
            <TaskAddDialog categories={categories || []} />
          </div>
          {childrenWithProps}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
