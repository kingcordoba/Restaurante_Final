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

  public soloNumeros(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  disabledCamposFormularios(id, disabled = true) {
    const campos = document.getElementById(id).getElementsByTagName('input')
    if (disabled) {
      for (let i = 0; i < campos.length; i++) {
        campos[i].setAttribute('disabled', 'true');
      }
    } else {
      for (let i = 0; i < campos.length; i++) {
        campos[i].removeAttribute('disabled');
      }
    }
  }
}
