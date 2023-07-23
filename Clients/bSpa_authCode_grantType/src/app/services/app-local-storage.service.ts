import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import jwtDecode from "jwt-decode";
import User from "../models/user";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class AppLocalStorageService {
  currentUser: User | null;
  constructor(private tokenService: TokenService, private globalService: GlobalService) {
    this.currentUser = this.getCurrentUser();
  }

  getCurrentUser(): User | null {
    const accessToken = this.tokenService.getAccessToken();

    if (accessToken && !this.tokenService.isAccessTokenExpired() && this.currentUser) {
      if (this.currentUser) return this.currentUser;
      else {
        try {
          const tokenData: any = jwtDecode(accessToken);
          const contactDataStr = tokenData.contact_data;
          const userData = {
            ...(contactDataStr ? JSON.parse(contactDataStr) : {}),
          } as User;

          return userData;
        } catch (error) {
          console.error("Error decoding token:", error);
          // this.globalService.redirectToLogin();
          return {} as User;
        }
      }
    } else {
      this.globalService.redirectToLogin();
      return null;
    }
  }
}
