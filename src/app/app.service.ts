import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private titleService: Title) {}

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value} | Delicias de Tato`);
  }
}
