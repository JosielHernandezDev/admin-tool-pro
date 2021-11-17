import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _linkTheme = document.querySelector('#themeGlobalTemplate');

  constructor() { 
    const storageTheme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this._linkTheme?.setAttribute('href',storageTheme);
  }

  changeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`;
    this._linkTheme?.setAttribute('href',url); 
    localStorage.setItem('theme',url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    links.forEach((element:any) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this._linkTheme?.getAttribute('href');
      if(btnThemeUrl === currentTheme){
          element.classList.add('working');
      }
      
    })

  }

}
