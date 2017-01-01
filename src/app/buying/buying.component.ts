import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebService } from './../fireb.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit, OnDestroy {
  datasub;
  data;
  idsub;
  id;

  constructor(private fbsvc: FirebService, private router: Router, private activeroute: ActivatedRoute) {
    if (fbsvc.checkAuth()) {
      this.idsub = this.activeroute.params.subscribe(params => {
        this.id = params['id'];
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.datasub = this.fbsvc.GetObject('items/' + this.id).subscribe(value => {
      this.data = value;
      if(this.data.flag != true)
      {
      this.router.navigate(['home']);
      }
    });
  }

  ngOnDestroy() {
    if (this.datasub != null) {
      this.datasub.unsubscribe();
    }
    if (this.idsub != null) {
      this.idsub.unsubscribe();
    }
  }
}
