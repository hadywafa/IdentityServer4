import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./components/shared-components/login/login.component";
import { HomeComponent } from "./components/app-components/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommercialLayoutComponent } from "./layout/commercial-layout/commercial-layout.component";
import { AuthGuard } from "./guards/auth.guard";
import { SecurePageComponent } from "./components/app-components/secure-page/secure-page.component";
import { RegisterComponent } from "./components/shared-components/register/register.component";

const routes: Routes = [
  {
    path: "login",
    component: AuthLayoutComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ],
  },
  {
    path: "",
    component: CommercialLayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "secure-page", component: SecurePageComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
