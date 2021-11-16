import { Component, Input,   Output ,EventEmitter, OnInit} from '@angular/core'

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
    `.readonly-input-white{
      background-color: white;
      color: black;
      cursor: default;
    }`
  ]
})
export class IncrementadorComponent implements OnInit{

  @Input() progress: number = 0;
  @Input() btnClass:String='primary';

  @Output() clickChange: EventEmitter<number> = new EventEmitter();


  ngOnInit():void{
      this.btnClass  = `btn btn-${this.btnClass}`;
  }

  get percentage() {
    return `${this.progress}%`;
  }

  changeValue(val: number) {

    if (this.progress >= 100 && val >= 0) {
      this.clickChange.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && val < 0) {
      this.clickChange.emit(0);
      this.progress = 0;
      return;
    }

    this.clickChange.emit(this.progress + val);
    this.progress = this.progress + val;
  }

}
