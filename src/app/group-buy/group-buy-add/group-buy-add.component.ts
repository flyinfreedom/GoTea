import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirebService } from './../../fireb.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as firebase from 'firebase';

declare var swal: any;

@Component({
  selector: 'app-group-buy-add',
  templateUrl: './group-buy-add.component.html',
  styleUrls: ['./group-buy-add.component.css']
})
export class GroupBuyAddComponent implements OnInit, OnDestroy {
  photoUrl: string;
  GroupBuyForm: FormGroup;
  @ViewChild('modal')
  modal: ModalComponent;

  @ViewChild('fphoto')
  fphoto;

  constructor(private fbsvc: FirebService, private _formbuilder: FormBuilder) {
    const storageRef = firebase.storage().ref().child
    this.GroupBuyForm = this.buildGroup();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.photoUrl = null;
    this.GroupBuyForm = null;
    this.modal = null;
    this.fphoto = null;
  }

  create() {
    let form = this.GroupBuyForm;
    let firebasesvc = this.fbsvc;
    let file = this.fphoto.nativeElement.files[0];


    if (file != null) {
      let storageRef = firebase.storage().ref();
      let metadata = { 'contentType': file.type };
      let photourl: string;

      storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {
        var url = snapshot.metadata.downloadURLs[0];
        swal("success", "Upload success", "success");
        form.controls["photo"].setValue(url);
        form.controls["fileName"].setValue(file.name);
        firebasesvc.Add("items", form.value);
      }).catch(function (error) {
        swal("error", "Upload failed", "error");
        console.error('Upload failed:', error);
      });
    } else {
      firebasesvc.Add("items", form.value);
    }
    this.modal.close();
  }

  buildGroup(): FormGroup {
    return this._formbuilder.group({
      name: ['', Validators.required],
      desc: [''],
      creator: [this.fbsvc.displayName],
      creatorId: [this.fbsvc.uid],
      photo: ['/assets/images/AngularWithFirebase.png'],
      fileName: [''],
      flag: [false]
    });
  }
}
