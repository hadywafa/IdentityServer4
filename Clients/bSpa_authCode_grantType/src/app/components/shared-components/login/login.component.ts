import { GlobalService } from "./../../../services/global.service";
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
  constructor(private formBuilder: FormBuilder, private tokenService: TokenService, private global: GlobalService) {
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
    }
    this.tokenService.requestAccessToken();
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
