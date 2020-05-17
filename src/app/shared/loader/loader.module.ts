import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoaderComponent]
})
export class LoaderModule { }
