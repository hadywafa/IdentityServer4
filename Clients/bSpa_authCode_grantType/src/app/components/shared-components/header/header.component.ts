import { GlobalService } from "./../../../services/global.service";
import { TokenService } from "src/app/services/token.service";
import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

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

  login() {
    // Redirect to IdentityServer4 login endpoint with necessary query parameters
    const redirectUri = window.location.origin + "/"; // Replace 'callback' with your callback route
    const authUrl = `${
      environment.identityServer.baseUrl
    }/connect/authorize?client_id=your-client-id&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20profile&state=random-state`;

    window.location.href = authUrl;
  }
  logout() {
    this.tokenService.clearTokens();
    this.global.redirectToHome();
  }
}
