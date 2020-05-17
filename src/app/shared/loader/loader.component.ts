import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() encender: boolean = false;
  @Input() mensaje: string = '';
  mostrar: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.encender) {
      this.mostrar = true;
      this.spinnerService.show();
    } else {
      this.mostrar = false;
      this.spinnerService.hide();
    }
    console.log("This, encender ", this.encender);
  }

}
