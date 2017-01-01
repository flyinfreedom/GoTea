import { FirebService } from './fireb.service';
import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private fbsvc: FirebService) {

  }

  ngAfterViewInit() {
    $(".navbar-main-collapse a").click(function () {
      let flag = $(".navbar-collapse").attr('aria-expanded');
      if (flag == 'true') {
        $('.navbar-toggle').click();
      }
    });
  }
}
