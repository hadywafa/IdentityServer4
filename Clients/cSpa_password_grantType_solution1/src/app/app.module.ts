import { matLogoutOutline } from "@ng-icons/material-icons/outline";
import { SharedModule } from "./components/shared/shared.module";
import { TokenDashboardComponent } from "./components/pages/token-dashboard/token-dashboard.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgIconsModule } from "@ng-icons/core";
import { heroUsers } from "@ng-icons/heroicons/outline";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./components/pages/home/home.component";
@NgModule({
  declarations: [AppComponent, TokenDashboardComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({
      heroUsers,
      matLogoutOutline,
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
