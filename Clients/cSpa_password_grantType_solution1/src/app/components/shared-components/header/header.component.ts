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
  constructor(private tokenService: TokenService, private global: GlobalService) {
    this.title = "dSpa_password_grantType_solution1";
  }

  logout() {
    this.tokenService.clearTokens();
    this.global.redirectToLogin();
  }
}
