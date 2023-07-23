import { GlobalService } from "./../../../services/global.service";
import { TokenService } from "src/app/services/token.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  title: string;
  isAuthenticated: boolean;
  constructor(private tokenService: TokenService, private global: GlobalService) {
    this.title = "dSpa_password_grantType_solution1";
    this.isAuthenticated = !this.tokenService.isAccessTokenExpired();
  }

  logout() {
    this.tokenService.clearTokens();
    this.global.redirectToLogin();
  }
}
