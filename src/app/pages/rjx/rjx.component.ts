import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rjx',
  templateUrl: './rjx.component.html',
  styles: [],
})
export class RjxComponent implements OnInit {
  
  public intSub$!:Subscription;

  constructor() {

    // this.getObs.pipe(retry(1)).subscribe(
    //   (val) => {
    //     console.log('sub:', val);
    //   },
    //   (err) => console.warn('error:', err),
    //   () => console.info('fin')
    // );

    this.intSub$= this.getInterval().subscribe(console.log);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intSub$.unsubscribe();
  }

  getInterval(): Observable<number> {
    return interval(1000).pipe(
      // take(10),
      map((x) => x + 1),
      filter(val=>(val%2==0)),
    );
  }

  get getObs(): Observable<number> {
    var i = 0;

    return new Observable<number>((observer) => {
      const int = setInterval(() => {
        observer.next(i++);

        if (i === 4) {
          clearInterval(int);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          clearInterval(int);
          console.log('o');
          observer.error('error en 2');
        }
      }, 1000);
    });
  }
}
