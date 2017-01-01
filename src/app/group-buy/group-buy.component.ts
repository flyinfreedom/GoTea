import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FirebService } from './../fireb.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as firebase from 'firebase';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-group-buy',
  templateUrl: './group-buy.component.html',
  styleUrls: ['./group-buy.component.css']
})
export class GroupBuyComponent implements OnInit, OnDestroy {
  sub;
  photoUrl: string;
  GroupBuyForm: FormGroup;
  @ViewChild('editmodal')
  editmodal: ModalComponent;

  @ViewChild('productmodal')
  productmodal: ModalComponent;

  @ViewChild('fphoto')
  fphoto;

  dataSub;
  data;
  itemId;

  constructor(private fbsvc: FirebService, private router: Router, private _formbuilder: FormBuilder) {
    if (fbsvc.checkAuth()) {
      this.dataSub = this.fbsvc.GetList("items").subscribe(
        (value) => this.data = value
      );
      const storageRef = firebase.storage().ref().child
    }
    else {
      this.router.navigate(['/login'], {});
    }

    this.GroupBuyForm = this.buildGroup({ name: '', desc: '', creator: '', creatorId: '', photo: '', fileName: '' });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.dataSub != null) {
      this.dataSub.unsubscribe();
    }
  }

  ItemFlag(key: string, flag: boolean, currentFlag: boolean) {
    if (flag != currentFlag) {
      let data = { flag: flag };
      this.fbsvc.Update('items/' + key, data);
    }
  }

  delete(key: string) {
    let firesvc = this.fbsvc;
    let temp;
    let fileName: string = "";

    let Sub = this.fbsvc.GetObject("items/" + key).subscribe(
      (value) => temp = value
    );

    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this data!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
      function () {
        fileName = temp.fileName;
        if (fileName != "") {
          let storageRef = firebase.storage().ref();
          console.log('images/' + fileName);
          let desertRef = storageRef.child('images/' + fileName);
          desertRef.delete().then(function () {
            console.log("deleted success");
          }).catch(function (error) {
            console.log(error.message);
          });
        }
        firesvc.DeleteThen('discuss/' + key).then(
          () => {
            firesvc.DeleteThen('baskets/' + key).then(
              () => {
                firesvc.DeleteThen('products/' + key).then(
                  () => {
                    firesvc.DeleteThen('items/' + key).then(
                      () => {
                        swal("Deleted!", "Your item has been deleted.", "success");
                      });
                  });
              })
          });
      });
  }

  clearMsg(key: string) {
    let firebaseService = this.fbsvc;
    swal({
      title: "Are you sure?",
      text: "Your will not be able to recover this data!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
      function () {
        firebaseService.Delete('discuss/' + key);
        swal("Deleted!", "Your message has been deleted.", "success");
      });

  }

  //---- 可以的話 把Edit 也搬出去到另一個 Component ---
  update(key: string) {
    this.itemId = key;
    for (let item of this.data) {
      if (item.$key == key) {
        this.GroupBuyForm = this.buildGroup(item);
      }
    }
    this.editmodal.open();
  }

  product(key: string) {
    this.itemId = key;
    this.productmodal.open();
  }

  edit() {
    let form = this.GroupBuyForm;
    let firebasesvc = this.fbsvc;
    let file = this.fphoto.nativeElement.files[0];
    let id = this.itemId;

    if (file != null) {
      let storageRef = firebase.storage().ref();
      let metadata = { 'contentType': file.type };
      let photourl: string;

      if (form.value.fileName != '' || form.value.fileName != null) {
        let DeltestorageRef = firebase.storage().ref();
        let desertRef = storageRef.child('images/' + form.value.fileName);
        desertRef.delete().then(function () {
          console.log("deleted success");
        }).catch(function (error) {
          console.log(error.message);
        });
      }

      storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {
        var url = snapshot.metadata.downloadURLs[0];
        swal("success", "Upload success", "success");
        form.controls["photo"].setValue(url);
        form.controls["fileName"].setValue(file.name);
        firebasesvc.Update('items/' + id, form.value);
      }).catch(function (error) {
        swal("error", "Upload failed", "error");
        console.error('Upload failed:', error);
      });
    } else {
      firebasesvc.Update('items/' + id, form.value);
    }

    this.fphoto.nativeElement.value = null;
    this.editmodal.close();
  }

  buildGroup(data): FormGroup {
    return this._formbuilder.group({
      name: [data.name, Validators.required],
      desc: [data.desc],
      creator: [data.creator],
      creatorId: [data.creatorId],
      photo: [data.photo],
      fileName: [data.fileName]
    });
  }
}
