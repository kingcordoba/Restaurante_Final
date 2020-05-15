import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../assets/sass/now-ui-kit.scss']
})
export class FooterComponent implements OnInit {
  data : Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
