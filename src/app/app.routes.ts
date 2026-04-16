import { Routes } from "@angular/router";
import { AddAgent } from "./views/login/add-agent";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => AddAgent,
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login",
  },
];
