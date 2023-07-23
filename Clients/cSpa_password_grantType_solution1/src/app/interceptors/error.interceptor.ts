import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { GlobalService } from "../services/global.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService, private toaster: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((res) => {
        const requestBaseUrl = this.globalService.getRequestUrl(request.url, false);

        if (requestBaseUrl === environment.identityServer.baseUrl) {
          if (res.status === 400) {
            //You have entered an incorrect individual login ID or password
          } else if (res.status === 401) {
            //Unauthorized => Refresh token => next interceptor will handle it
            this.toaster.error("Unauthorized");
          } else if (res.status === 500) {
            this.toaster.error("Server Error");
          } else {
            this.toaster.error("Server is offline");
          }
        }
        return throwError(() => res);
      }),
      map((response: any) => {
        return response;
      })
    );
  }
}
