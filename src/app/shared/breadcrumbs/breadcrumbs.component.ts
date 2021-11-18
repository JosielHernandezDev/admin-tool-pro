import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {
  
  public title: string = '';
  private _router$!: Subscription;


  constructor(private router: Router) {
    this._router$ = this.getDataRouter().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter((x: any) => x instanceof ActivationEnd),
      filter((x: ActivationEnd) => x.snapshot.firstChild == null),
      map((x: ActivationEnd) => x.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._router$.unsubscribe();
    document.title = `AdminPro`;
  }
}
