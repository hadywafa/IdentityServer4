import { GlobalService } from "./../../../services/global.service";
import { AppLocalStorageService } from "./../../../services/app-local-storage.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, defer, takeUntil } from "rxjs";
import { TokenService } from "src/app/services/token.service";
import { BaseComponent } from "../../base.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private appLocalStorage: AppLocalStorageService,
    private global: GlobalService
  ) {
    super();
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get("email")?.value;
      const password = this.loginForm.get("password")?.value;
      this.tokenService
        .requestAccessToken(email, password)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            const user = this.appLocalStorage.getCurrentUser();
            this.loading = false;
            this.global.redirectToHome();
          },
          error: (error) => {
            this.loading = false;

            this.displayError(error).pipe(takeUntil(this.destroyed$)).subscribe();
          },
        });
    }
  }

  displayError(error: string): Observable<void> {
    return defer(async () => {
      await Swal.fire({
        title: "Login Failed",
        text: error,
      });
    });
  }
}
