import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NgIconsModule } from "@ng-icons/core";
import { heroUsers } from "@ng-icons/heroicons/outline";
import { matLogoutOutline } from "@ng-icons/material-icons/outline";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
  bootstrapFacebook,
  bootstrapGithub,
  bootstrapGoogle,
  bootstrapMicrosoft,
  bootstrapTwitter,
} from "@ng-icons/bootstrap-icons";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroUsers,
      bootstrapGithub,
      bootstrapTwitter,
      matLogoutOutline,
      bootstrapMicrosoft,
      bootstrapFacebook,
      bootstrapGoogle,
    }),
  ],
  declarations: [HeaderComponent, LoginComponent, RegisterComponent],
  exports: [HeaderComponent, LoginComponent, RegisterComponent],
})
export class SharedModule {}
