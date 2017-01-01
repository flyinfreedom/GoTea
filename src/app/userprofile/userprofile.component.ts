import { FirebService } from './../fireb.service';
import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  UserProfileForm: FormGroup;

  constructor(private fbsvc: FirebService, private _formbuilder: FormBuilder, private router: Router) {
    this.UserProfileForm = this.buildGroup();
    if (fbsvc.checkAuth()) {
      this.UserProfileForm.setValue({ name: fbsvc.user.auth.displayName, photoUrl: fbsvc.user.auth.photoURL });
    }
    else {
      this.router.navigate(['/login'], {});
    }
  }

  ngOnInit() {
  }

  updateUserProfile() {
    this.fbsvc.UpdateUserProfile(this.UserProfileForm.value.name, this.UserProfileForm.value.photoUrl);
  }

  buildGroup(): FormGroup {
    return this._formbuilder.group({
      name: ['', Validators.required],
      photoUrl: ['']
    });
  }
}
