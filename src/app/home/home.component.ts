import { FirebService } from './../fireb.service';
import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;

  constructor(private fbsvc: FirebService, private router: Router) {
    if (fbsvc.checkAuth()) {
      this.data = fbsvc.GetList('items');
    }
    else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  GoBuying(id: string) {
    this.router.navigate(['buying', id]);
  }


  /*//--- 用不到嚕 
  
    Add() {
      this.fbsvc.Add('items', { name: "Eden", desc: "is very handsome" });
    }
  
    Delete(key) {
      this.fbsvc.Delete('items/' + key);
    }
  
    Update(key) {
      let data = { name: "Ryan", desc: "very so so" };
      this.fbsvc.Update('items/' + key, data);
    }
    */
}
