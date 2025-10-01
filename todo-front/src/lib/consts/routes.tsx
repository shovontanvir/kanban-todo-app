import type RouteType from "../../types/routes";
import Login from "../../pages/Login/Login";
import TaskBoard from "../../pages/TaskBoard/TaskBoard";
import SignUp from "@/pages/SignUp/SignUp";

export const ROUTES: RouteType[] = [
  {
    id: 1,
    name: "Login",
    path: "/login",
    element: <Login />,
    isProtected: false,
  },
  {
    id: 2,
    name: "TaskBoard",
    path: "/",
    element: <TaskBoard checkDeadlineNearTasks={() => {}} />,
    isProtected: true,
  },
  {
    id: 3,
    name: "SignUp",
    path: "/signup",
    element: <SignUp />,
    isProtected: false,
  },
];
