import { TokenService } from "src/app/services/token.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, catchError, defer } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-auth-callback",
  template: "<div></div>",
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get("code");
      const state = params.get("state");
      if (code && state && state === localStorage.getItem("state")) {
        this.tokenService
          .handleCallback(code)
          .pipe(catchError((error) => this.displayError("Missing required query parameters.")))
          .subscribe(() => {
            window.location.href = "/";
          });
      } else {
        this.displayError("Missing required query parameters.");
      }
    });
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
