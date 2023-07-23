import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import jwtDecode from "jwt-decode";
import { TokenResponse } from "../models/token-response";
import { environment } from "src/environments/environment";
import User from "../models/user";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private readonly LOCAL_STORAGE_ACCESS_TOKEN = "access_token";
  private readonly LOCAL_STORAGE_REFRESH_TOKEN = "refresh_token";
  private readonly AUTH_ENDPOINT = `${environment.identityServer.baseUrl}/connect/authorize`;
  private readonly TOKEN_ENDPOINT = `${environment.identityServer.baseUrl}/connect/token`;
  private accessTokenExp!: number;
  currentUser: User | null;
  constructor(private http: HttpClient) {
    this.currentUser = this.getCurrentUser();
  }

  requestAccessToken(): void {
    const state = Math.random().toString(36).substr(2, 10); // Generate a random state for CSRF protection
    localStorage.setItem("state", state);

    const params = new HttpParams()
      .set("client_id", environment.identityServer.clientId)
      .set("redirect_uri", environment.identityServer.redirect_uri)
      .set("scope", environment.identityServer.scope)
      .set("response_type", "code")
      .set("state", state);

    window.location.href = `${this.AUTH_ENDPOINT}?${params.toString()}`;
  }

  handleCallback(code: string): Observable<any> {
    const requestParams = new HttpParams()
      .set("client_id", environment.identityServer.clientId)
      .set("grant_type", "authorization_code")
      .set("code", code)
      .set("redirect_uri", code);

    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    // Exchange the authorization code for an access token
    return this.http
      .post<any>(this.TOKEN_ENDPOINT, requestParams.toString(), {
        headers,
      })
      .pipe(
        map((response) => {
          const tokenResponse = new TokenResponse(response);
          this.setTokens(tokenResponse.access_token, tokenResponse.refresh_token);
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
      .set("client_id", environment.identityServer.clientId);

    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    return this.http
      .post<TokenResponse>(this.TOKEN_ENDPOINT, params.toString(), {
        headers,
      })
      .pipe(
        map((response) => {
          const tokenResponse = new TokenResponse(response);
          this.setTokens(tokenResponse.access_token, tokenResponse.refresh_token);
        })
      );
  }
  //-----------------------------------------------------------------------------
  getCurrentUser(): User | null {
    const accessToken = this.getAccessToken();

    if (accessToken && !this.isAccessTokenExpired() && this.currentUser) {
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
          return {} as User;
        }
      }
    } else {
      this.requestAccessToken();
      return null;
    }
  }
  //-----------------------------------------------------------------------------
  getAccessToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_REFRESH_TOKEN);
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

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    const tokenData: any = jwtDecode(accessToken);
    this.accessTokenExp = tokenData.exp;
  }
}
