import type { JSX } from "react";

export default interface RouteType {
  id: number;
  name: string;
  path: string;
  element: JSX.Element;
  isProtected: boolean;
}
