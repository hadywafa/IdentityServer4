import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import jwtDecode from "jwt-decode";
import { TokenResponse } from "../models/token-response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private readonly LOCAL_STORAGE_ACCESS_TOKEN = "access_token";
  private readonly LOCAL_STORAGE_REFRESH_TOKEN = "refresh_token";
  private accessTokenExp!: number;
  constructor(private http: HttpClient) {}

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    const tokenData: any = jwtDecode(accessToken);
    this.accessTokenExp = tokenData.exp;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  requestAccessToken(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", environment.identityServer.clientId)
      .set("client_secret", environment.identityServer.clientSecret)
      .set("username", username)
      .set("password", password)
      .set("scope", "read openid offline_access");

    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    return this.http
      .post<TokenResponse>(`${environment.identityServer.baseUrl}/connect/token`, params.toString(), { headers })
      .pipe(
        map((response) => {
          const tokenResponse = new TokenResponse(response);
          this.setTokens(tokenResponse.access_token, tokenResponse.refresh_token);
        }),
        catchError((result) => {
          // Handle the error and throw a new error to propagate it
          console.error("An error occurred during login:", result.error);
          return throwError(() => result.error.error_description);
        })
      );
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.LOCAL_STORAGE_REFRESH_TOKEN);

    if (!refreshToken) {
      return throwError(() => "Refresh token not found in local storage.");
    }

    const params = new HttpParams()
      .set("grant_type", "refresh_token")
      .set("refresh_token", refreshToken)
      .set("client_id", environment.identityServer.clientId)
      .set("client_secret", environment.identityServer.clientSecret);

    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post<TokenResponse>(`${environment.identityServer.baseUrl}/connect/token`, params.toString(), {
        headers,
      })
      .pipe(
        map((response) => {
          const tokenResponse = new TokenResponse(response);
          this.setTokens(tokenResponse.access_token, tokenResponse.refresh_token);
        })
      );
  }

  clearTokens(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(this.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  isAccessTokenExpired(): boolean {
    if (!this.accessTokenExp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return this.accessTokenExp < currentTime;
  }
}
