import { FirebService } from './../fireb.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginForm: FormGroup;
  subauth;

  constructor(private fbsvc: FirebService, private _formbuilder: FormBuilder, private router: Router) {
    this.LoginForm = this.buildGroup();

    this.subauth = this.fbsvc.auth.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.fbsvc.login(this.LoginForm.value.email, this.LoginForm.value.password);
  }

  buildGroup(): FormGroup {
    return this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.subauth != null) {
      this.subauth.unsubscribe();
    }
  }
}
