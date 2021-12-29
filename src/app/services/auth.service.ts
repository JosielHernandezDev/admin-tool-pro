import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/auth.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url!: string;
  public auth2!: any;

  constructor(
    private client: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.url = `${environment.base_api}/login`;
    this.googleInit();
  }

  public login(body: Login) {
    return this.client.post(this.url, body).pipe(
      tap((resp: any) => {
        resp?.token && localStorage.setItem('token', resp?.token);
      })
    );
  }

  public googleLogin(body: any) {
    return this.client.post(`${this.url}/google`, body).pipe(
      tap((resp: any) => {
        resp?.token && localStorage.setItem('token', resp?.token);
      })
    );
  }

  public validateToken(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';

    return this.client
      .get(`${this.url}/refresh`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap(
          (res: any) => res?.token && localStorage.setItem('token', res?.token)
        ),
        map((resp: any) => true),
        catchError((err: any) => of(false))
      );
  }

  public logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut().then((resp: any) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  public googleInit() {
    return new Promise((resolve:any) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '812269500406-2ltv3tkm1vuaqdffq5hr5j5h4lps2hti.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
        // this.attachSignin(document.getElementById('my-signin2'));
      });
    });
  }
}
