import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy } from '@angular/core';
import { FirebService } from './../../fireb.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  itemId;
  idsub;
  countsub;

  pagelimit: number = 5;
  pageCount: Array<number> = [1];
  currentPage: number = 1;

  data;
  constructor(private fbsvc: FirebService, private activeroute: ActivatedRoute) {
    this.idsub = this.activeroute.params.subscribe(params => {
      this.itemId = params['id'];
      //this.data = this.fbsvc.GetList('products/' + this.itemId);
      this.countsub = this.fbsvc.GetList('products/' + this.itemId).subscribe(
        value => {
          this.data = value;
          let pagemax = Math.floor(this.data.length / this.pagelimit);
          if (this.data.length % this.pagelimit != 0) {
            pagemax++;
          }

          this.pageCount = new Array<number>(pagemax);
          for (let i = 0; i < pagemax; i++) {
            this.pageCount[i] = (i + 1);
          }
        });
    });
  }

  ngOnInit() {
    
  }

  JoinMyBasket(key: string) {
    let data;
    let sub = this.fbsvc.GetObject('products/' + this.itemId + '/' + key).subscribe(
      value => {
        data = { name: value.name, desc: value.desc, price: value.price, buyer: this.fbsvc.displayName };
      });
    this.fbsvc.Add('baskets/' + this.itemId + '/' + this.fbsvc.uid, data);
    sub.unsubscribe();
  }

  ngOnDestroy() {
    if (this.idsub != null) {
      this.idsub.unsubscribe();
    }
    if (this.countsub != null) {
      this.countsub.unsubscribe();
    }
    
    this.itemId = null;
    this.idsub = null;
    this.countsub = null;
    this.pagelimit = null;
    this.data = null;
    this.pageCount = null;
    this.currentPage = null;
  }

  //---- 以下為分頁用的 ----

  previous() {
    if (this.currentPage != 1) {
      this.currentPage--;
    }
  }

  next() {
    if (this.currentPage != this.pageCount.length) {
      this.currentPage++;
    }
  }

  goto(page: number) {
    this.currentPage = page;
  }

  productHidden(_item): boolean {
    let location = 0;

    if (this.data == null) {
      return true;
    }

    for (let item of this.data) {
      if (item.$key == _item.$key) {
        break;
      }
      location++;
    }

    let range: Array<number> = [this.pagelimit * (this.currentPage - 1), this.pagelimit * this.currentPage];

    if (location >= range[0] && location < range[1]) {
      return false;
    }
    else {
      return true;
    }
  }

  activeclass(page): boolean {
    if (page == this.currentPage) {
      return true;
    }
    else {
      return false;
    }
  }
}
