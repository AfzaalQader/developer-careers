import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../service/auth.service";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService) {}
  responce = false;
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.responce = !this.auth.login(form.value.email, form.value.password);
  }
}
