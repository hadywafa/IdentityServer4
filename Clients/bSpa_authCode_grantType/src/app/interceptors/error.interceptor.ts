import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, defer, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GlobalService } from "../services/global.service";
import Swal from "sweetalert2";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((res) => this.handleError(res, request.url)),
      map((response: any) => response)
    );
  }

  private handleError(response: any, requestUrl: string): Observable<any> {
    const requestBaseUrl = this.globalService.getRequestUrl(requestUrl, false);

    if (requestBaseUrl === environment.identityServer.baseUrl) {
      switch (response.status) {
        case 400:
          return throwError(() => response);
        case 401:
          return this.displayError("Unauthorized");
        case 500:
          return this.displayError("Server Error");
        default:
          return this.displayError("Server is offline");
      }
    } else {
      return throwError(() => response);
    }
  }

  private displayError(error: string): Observable<void> {
    return defer(async () => {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
        text: error,
      });
    });
  }
}
