import { GlobalService } from "../services/global.service";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, switchMap } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private global: GlobalService, private tokenService: TokenService) {}
  canActivate(): Observable<boolean | string> {
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken && !this.tokenService.isAccessTokenExpired()) {
      return of(true); // Access token is valid
    } else {
      const refreshToken = this.tokenService.getRefreshToken();
      if (refreshToken) {
        return this.tokenService.refreshAccessToken().pipe(
          switchMap(() => {
            return of(true);
          }),
          catchError(() => {
            this.global.redirectToLogin();
            return of(false); // Failed to refresh access token
          })
        );
      } else {
        this.global.redirectToLogin();
        return of(false); // No refresh token available
      }
    }
  }
}
