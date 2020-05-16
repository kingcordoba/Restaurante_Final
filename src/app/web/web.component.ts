import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
})
export class WebComponent implements OnInit {
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  // tslint:disable-next-line: max-line-length
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any, private element: ElementRef, public location: Location){}

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    if (window.outerWidth > 991) {
      window.document.children[0].scrollTop = 0;
    } else {
      window.document.activeElement.scrollTop = 0;
    }
    /* this.navbar.sidebarClose(); */
    navbar.classList.remove('navbar-transparent');

    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      let _location = this.location.path();
      _location = _location.split('/')[1];

      navbar.classList.remove('navbar-transparent');
      if (_location === undefined || _location === 'login' || _location === 'perfil' || _location === 'registro') {
        if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.remove('navbar-transparent');
        } else {
          // remove logic
          navbar.classList.add('navbar-transparent');
        }
      }
    });
  }
}
