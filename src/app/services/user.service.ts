import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { registerUser } from '../interfaces/user-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url!: string;

  constructor(private client: HttpClient) {
    this.url = `${environment.base_api}/users`;
  }

  public updateProfile(uid:string,body:any){

    const token: string = localStorage.getItem('token') || '';

    return this.client.put(`${this.url}/${uid}`,body,{
      headers: {
        'x-token': token,
      },
    })
  }

  public registerUser(body: registerUser) {
    return this.client.post(this.url, body).pipe(
      tap((resp: any) => {
        resp?.token && localStorage.setItem('token', resp?.token);
      })
    );
  }
}
