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
        },
        {
          title: 'Promises',
          url: 'promise',
        },
        {
          title: 'Rjx',
          url: 'rjx-page',
        },
      ],
    },
  ];
  constructor() {}
}
