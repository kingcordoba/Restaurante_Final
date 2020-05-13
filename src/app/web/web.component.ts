import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private renderer : Renderer2, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location){}

  ngOnInit() {
    var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
    if (window.outerWidth > 991) {
      window.document.children[0].scrollTop = 0;
    } else {
      window.document.activeElement.scrollTop = 0;
    }
    /* this.navbar.sidebarClose(); */

    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      var _location = this.location.path();
      _location = _location.split('/')[2];

      if (number > 150 || window.pageYOffset > 150) {
        navbar.classList.remove('navbar-transparent');
      } else if (_location !== 'login') {
        // remove logic
        navbar.classList.add('navbar-transparent');
      }
    });
  }
}
