//This service is  responcible for user login and user signup and mnaging user data
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private expireToken: any;
  constructor(private http: HttpClient, private router: Router) {}
  //Login
  login(email: string, password: string) {
    //API call for
    console.log(email);
    console.log(password);
    if (email == "admin@gmail.com" && password == "12345") {
      console.log("Valid");
      this.router.navigate(["admin"]);
      return true;
    } else {
      return false;
    }
  }
}
