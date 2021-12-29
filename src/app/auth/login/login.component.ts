import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public formSumited = false;

  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone:NgZone
  ) {
    this.loginForm = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required]],
      remember: [localStorage.getItem('email') ? true : false],
    });
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.formSumited = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (resp: any) => {
          if (resp?.success) {
            this.formSumited = false;

            if (this.loginForm?.controls['remember']?.value) {
              localStorage.setItem(
                'email',
                this.loginForm?.controls['email']?.value
              );
            } else {
              localStorage.removeItem('email');
            }

            if (resp.token) {
              this.router.navigate(['/dashboard']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error with connection!',
              });
            }
          }
        },
        (err: any) => {
          const { error } = err;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.msg}`.toUpperCase(),
          });
        }
      );
    }
  }

  validateEmail() {
    return (
      this.loginForm?.controls['email']?.hasError('email') && this.formSumited
    );
  }

  validateEntity(value: string): boolean {
    return (
      this.loginForm?.controls[value]?.hasError('required') && this.formSumited
    );
  }

  onSuccessLogin(googleUser: any) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

    var google_token = googleUser?.getAuthResponse()?.id_token;

    this.authService.googleLogin({ google_token }).subscribe(
      (resp: any) => {
        if (resp?.success) {
          if (resp.token) {
            this.ngZone.run(()=>{
              this.router.navigate(['/dashboard']);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error with connection!',
            });
          }
        }
      },
      (err: any) => {
        const { error } = err;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.msg}`.toUpperCase(),
        });
      }
    );
  }

  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 350,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

async startApp() {
    await this.authService.googleInit();
    this.auth2 = this.authService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
       (googleUser:any) =>{
        this.onSuccessLogin(googleUser);
      },
      (error:any) =>{
        this.onFailure(error);

      }
    );
  }




}
