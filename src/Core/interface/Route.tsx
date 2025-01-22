import { ReactElement } from "react";

export interface RouteObject {
    path?: string;
    element: ReactElement;
    children?: RouteObject[];
  }
  