import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FirebService } from './../../fireb.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buying-list',
  templateUrl: './buying-list.component.html',
  styleUrls: ['./buying-list.component.css']
})
export class BuyingListComponent implements OnInit, OnDestroy {
  tempId;
  itemId;
  idsub;
  data;

  @ViewChild('descmodal')
  modal: ModalComponent

  @ViewChild('txtdesc')
  txtdesc;

  constructor(private fbsvc: FirebService, private activeroute: ActivatedRoute) {
    this.idsub = this.activeroute.params.subscribe(params => {
      this.itemId = params['id'];
      this.data = this.fbsvc.GetList('baskets/' + this.itemId + '/' + this.fbsvc.uid);
    });
  }

  ngOnInit() {
  }

  cancel(key: string) {
    this.fbsvc.Delete('baskets/' + this.itemId + '/' + this.fbsvc.uid + '/' + key);
  }

  UpdateModal(key: string) {
    this.tempId = key;
    this.fbsvc.GetObject('baskets/' + this.itemId + '/' + this.fbsvc.uid + '/' + this.tempId).subscribe(
      value => this.txtdesc.nativeElement.value = value.desc
    );
    this.modal.open();
  }

  UpdateDesc() {
    let data = { desc: this.txtdesc.nativeElement.value }
    this.fbsvc.Update('baskets/' + this.itemId + '/' + this.fbsvc.uid + '/' + this.tempId, data);
    this.txtdesc.nativeElement.value = null;
    this.modal.close();
  }

  keyupdatedesc(event) {
    if (event.keyCode == 13) {
      this.UpdateDesc();
    }
  }

  ngOnDestroy() {
    if (this.idsub != null) {
      this.idsub.unsubscribe();
    }
  }

}
