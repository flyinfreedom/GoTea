import { ActivatedRoute } from '@angular/router';
import { FirebService } from './../../fireb.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

declare var swal: any;
declare var $:any;

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit, OnDestroy, AfterViewInit {
  itemId;
  idsub;
  data;
  datasub;

  @ViewChild('msgBlock')
  msgBlock;

  constructor(private fbsvc: FirebService, private activeroute: ActivatedRoute) {
    this.idsub = this.activeroute.params.subscribe(params => {
      this.itemId = params['id'];
      this.datasub = this.fbsvc.GetList('discuss/' + this.itemId).subscribe(
        value => {
          this.data = value;
        }
      );
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.idsub != null) {
      this.idsub.unsubscribe();
    }

    if (this.datasub != null) {
      this.datasub.unsubscribe();
    }

    this.data = null;
    this.itemId = null;
  }

  ngAfterViewInit() {
    
  }

  fastsend(event) {
    if (event.keyCode == 13) {
      let msg = event.target.value;
      this.sendmessge(event.target);
    }
  }

  sendmessge(msg) {
    let str = msg.value;
    if (str == null || str == '') {
      //swal('error', 'the message cannot be empty', 'error');
    }
    else {
      let data = { msg: str, user: this.fbsvc.displayName, userid: this.fbsvc.uid };
      this.fbsvc.AddThen('discuss/' + this.itemId, data).then(() => {
        msg.value = "";
        this.msgBlock.nativeElement.scrollTop = 9999999;
      });
    }
  }

}
