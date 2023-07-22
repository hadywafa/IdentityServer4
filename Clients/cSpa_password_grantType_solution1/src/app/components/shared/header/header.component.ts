import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  title: string;
  constructor() {
    this.title = "dSpa_password_grantType_solution1";
  }

  logout() {
    alert("logout");
  }
}
