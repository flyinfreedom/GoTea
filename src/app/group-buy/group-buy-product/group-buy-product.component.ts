import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { FirebService } from './../../fireb.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as firebase from 'firebase';

declare var swal: any;

@Component({
  selector: 'app-group-buy-product',
  templateUrl: './group-buy-product.component.html',
  styleUrls: ['./group-buy-product.component.css']
})
export class GroupBuyProductComponent implements OnInit, OnChanges {
  @Input() itemId;

  @ViewChild('productName')
  productName;

  @ViewChild('productListWrapper')
  productListWrapper;

  ProductForm: FormGroup;
  Pdata;

  constructor(private fbsvc: FirebService, private _formbuilder: FormBuilder) {
    this.ProductForm = this.buildGroup();
    this.Pdata = fbsvc.GetList('/products/' + this.itemId);
    // if(this.data){

    // }
    // else{
    //   this.data = [];
    // }
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.Pdata = this.fbsvc.GetList('/products/' + this.itemId);
  }

  AddProduct() {
    this.fbsvc.AddThen('/products/' + this.itemId, this.ProductForm.value).then(
      () => {
        this.ProductForm = this.buildGroup();
        this.productName.nativeElement.focus();
        console.log(this.productListWrapper);
        this.productListWrapper.nativeElement.scrollTop = 9999999;
        swal("success!", "Create completed", "success");
      });
  }

  FastAdd(event) {
    if (event.keyCode == 13) {
      if (this.ProductForm.valid) {
        this.fbsvc.AddThen('/products/' + this.itemId, this.ProductForm.value).then(
          () => {
            this.ProductForm = this.buildGroup();
            this.productName.nativeElement.focus();
            this.productListWrapper.nativeElement.scrollTop = 9999999;
          });
      }
      else {
        swal('error', 'valid is failded!', 'error');
      }
    }
  }

  singleUpdate(event, key, field) {
    if (event.keyCode == 13) {
      if (event.target.value != null && event.target.value != '') {
        let data;
        if (field == 'name') {
          data = { name: event.target.value };
        }
        else {
          data = { price: event.target.value };
        }
        this.fbsvc.Update('/products/' + this.itemId + '/' + key, data);
      }
      else {
        swal('error', 'valid is failded!', 'error');
      }
    }
  }

  DeleteProduct(key: string) {
    this.fbsvc.Delete('/products/' + this.itemId + '/' + key);
  }

  buildGroup(): FormGroup {
    return this._formbuilder.group({
      name: ['', Validators.required],
      desc: [''],
      price: ['', Validators.required]
    });
  }
}
