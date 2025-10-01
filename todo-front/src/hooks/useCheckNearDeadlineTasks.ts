/* eslint-disable @typescript-eslint/no-explicit-any */
import { isTomorrow } from "@/lib/utils";
import { useEffect } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
};

type DataWithTasks = {
  data?: Task[];
};

export const useCheckNearDeadlineTasks = (
  data: DataWithTasks,
  categories: any,
  callbackFn: (arg0: string[], arg1: any) => void
) => {
  useEffect(() => {
    const deadlineNearTasks: string[] = [];
    data?.data
      ?.filter(
        (item: {
          _id: string;
          title: string;
          description: string;
          status: string;
          deadline: string;
        }) => item.status !== "done" && isTomorrow(new Date(item.deadline))
      )
      .map(
        (item: {
          _id: string;
          title: string;
          description: string;
          status: string;
          deadline: string;
        }) => deadlineNearTasks.push(item.title)
      );

    callbackFn(deadlineNearTasks, categories?.data);
  }, [data, categories]);
};
