import { CommercialLayoutComponent } from "./../../layout/commercial-layout/commercial-layout.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { TokenDashboardComponent } from "./token-dashboard/token-dashboard.component";
import { SecurePageComponent } from "./secure-page/secure-page.component";
import { NgIconsModule } from "@ng-icons/core";
import { heroUsers } from "@ng-icons/heroicons/outline";
import { matLogoutOutline } from "@ng-icons/material-icons/outline";
import { SharedComponentsModule } from "../shared-components/shared-components.module";
import { SimpleLayoutComponent } from "src/app/layout/simple-layout/simple-layout.component";
import { RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "src/app/layout/auth-layout/auth-layout.component";

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    CommercialLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    TokenDashboardComponent,
    SecurePageComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    SharedComponentsModule,
    NgIconsModule.withIcons({
      heroUsers,
      matLogoutOutline,
    }),
  ],
})
export class AppComponentsModule {}
