import type { TaskType } from "@/types/taskType";

export const TASKTYPES: Array<TaskType> = [
  {
    id: 1,
    name: "Draft",
    keyTitle: "draft",
  },
  {
    id: 2,
    name: "To Do",
    keyTitle: "to-do",
  },
  {
    id: 3,
    name: "In Progress",
    keyTitle: "in-progress",
  },
  {
    id: 4,
    name: "Peer Review",
    keyTitle: "peer-review",
  },
  {
    id: 5,
    name: "Blocked",
    keyTitle: "blocked",
  },
  {
    id: 6,
    name: "Done",
    keyTitle: "done",
  },
];
