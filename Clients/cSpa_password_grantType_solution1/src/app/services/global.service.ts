import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  client!: string;
  event!: string;
  lang!: string;

  constructor(private router: Router) {}

  getBaseUrl(): string {
    return `${window.location.origin}`;
  }

  getRequestUrl(urlStr: string, hasPathDirectory: boolean = false): string {
    const fullUrl = new URL(urlStr);
    let url = fullUrl.origin;
    if (hasPathDirectory) {
      const arr = fullUrl.origin.split("/");
      url = arr[0] + "/" + arr[1] + "/" + arr[2];
    }
    return url;
  }

  redirectToLogin() {
    this.router.navigate([`../login`]).catch((e) => console.log(e));
  }
  redirectToHome() {
    this.router.navigate([`..`]).catch((e) => console.log(e));
  }
}
