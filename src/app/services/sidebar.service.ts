import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      iconClass: 'mdi mdi-gauge',
      title: 'Dashboard',
      childrens: [
        {
          title: 'Main',
          url: '',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
        {
          title: 'Char',
          url: 'grafica1',
        }
      ],
    },
  ];
  constructor() {}


}
