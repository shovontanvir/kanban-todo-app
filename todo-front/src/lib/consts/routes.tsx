import type RouteType from "../../types/routes";
import Login from "../../pages/Login/Login";
import TaskBoard from "../../pages/TaskBoard/TaskBoard";

export const ROUTES: RouteType[] = [
  {
    id: 1,
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    id: 2,
    name: "TaskBoard",
    path: "/",
    element: <TaskBoard />,
  },
];
