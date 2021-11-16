import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent { 

  progress1:number = 20;
  progress2:number =30;

  get percentage1() {
    return `${this.progress1}%`;
  }

  get percentage2(){
    return `${this.progress2}%`;
  }
}
