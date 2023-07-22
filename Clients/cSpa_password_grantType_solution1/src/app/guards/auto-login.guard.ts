import { GlobalsService } from "../services/globals.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class AutoLoginGuard {
  constructor(private global: GlobalsService, private tokenService: TokenService) {}
  canActivate(): Observable<boolean | string> {
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      this.global.redirectToHome();
      return of(true);
    } else {
      return of(true);
    }
  }
}
