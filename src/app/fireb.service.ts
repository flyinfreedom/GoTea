import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseAuthState, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

declare var swal: any;

@Injectable()
export class FirebService {
  public user: FirebaseAuthState;
  public auth: AngularFireAuth;
  public displayName: string;
  public uid:string;

  constructor(private af: AngularFire, private router: Router) {
    this.auth = af.auth;
    this.auth.subscribe(user => {
      if (user) {
        this.user = user;
        this.displayName = user.auth.displayName;
        this.uid = user.auth.uid;
      }
      else {
        this.user = null;
        this.router.navigate(['/login'], {});
      }
    });
  }


  createUser(email: string, password: string, displayname: string) {
    this.af.auth.createUser({ email: email, password: password });
  }

  checkAuth(): boolean {
    if (this.user) {
      return true;
    }
    else {
      return false;
    }
  }

  login(email: string, pw: string) {
    // this.auth.login({
    //   provider: AuthProviders.Google,
    //   method: AuthMethods.Popup
    // });
    //this.router.navigate(['/login'], { queryParams: { returnUrl: '/home' } });

    this.auth.login({
      email: email,
      password: pw
    }).then(
      (success) => {
        swal("success!", "Login completed", "success");
        this.displayName = this.user.auth.displayName;
        this.uid = this.user.auth.uid;
        this.router.navigate(['/home']);
      }).catch(
      (err) => {
        swal("error!", err.message, "error");
        this.router.navigate(['/login']);
      });
  }

  logout() {
    this.displayName = "";
    this.auth.logout();
  }

  UpdateUserProfile(displayName: string, photoUrl: string) {
    this.user.auth.updateProfile({
      displayName: displayName,
      photoURL: photoUrl
    }).then(
      (success) => {
        swal("success!", "Update completed", "success");
        this.displayName = displayName;
      }).catch(
      (err) => {
        swal("error!", err.message, "error");
      });
  }

  GetList(uri: string) {
    return this.af.database.list(uri);
  }

  GetObject(uri: string) {
    return this.af.database.object(uri);
  }

  Add(uri: string, data: any) {
    this.af.database.list(uri).push(data);
    swal("success!", "Create completed", "success");
  }

  Delete(uri: string) {
    this.af.database.object(uri).remove();
    swal("success!", "Delete completed", "success");
  }

  Update(uri: string, data: any) {
    this.af.database.object(uri).update(data);
    swal("success!", "Update completed", "success");
  }

  AddThen(uri: string, data: any):firebase.Thenable<any> {
    return this.af.database.list(uri).push(data);
  }

  UpdateThen(uri: string, data: any):firebase.Thenable<any> {
    return this.af.database.object(uri).update(data);
  }

  DeleteThen(uri: string):firebase.Thenable<any> {
    return this.af.database.object(uri).remove();
  }
}
