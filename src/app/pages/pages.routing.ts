//modules
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
//guards
import { AuthGuard } from "../guards/auth.guard";

//components
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromiseComponent } from "./promise/promise.component";
import { RjxComponent } from "./rjx/rjx.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        data:{
          title:"Dashboard"
        }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data:{
          title:"Progress"
        }
      },
      {
        path: "grafica1",
        component: Grafica1Component,
        data:{
          title:"Char"
        }
      },
      {
        path:"account-settings",
        component: AccountSettingsComponent,
        data:{
          title:"Account Settings"
        }
      },
      {
        path:"promise",
        component: PromiseComponent,
        data:{
          title:"Promises"
        }
      },
      {
        path:"rjx-page",
        component: RjxComponent,
        data:{
          title:"Rxjs"
        }
      },
      {
        path:"profile",
        component:  ProfileComponent,
        data:{
          title:"User Profile"
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
