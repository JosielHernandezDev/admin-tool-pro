import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public formSumited: boolean = false;

  constructor(private fb: FormBuilder,private userService:UserService,private router:Router) {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, Validators.required],
        password2: [null, Validators.required],
        termns: [false, Validators.requiredTrue],
      },
      {
        Validators: this.passEqual('password', 'password2'),
      }
    );
  }

  ngOnInit(): void {}

  saveUser() {
    this.formSumited = true;
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      const newUserModel = {
        name,
        email,
        password,
      };

      this.userService.registerUser(newUserModel).subscribe((resp:any)=>{
          if(resp?.success){
            this.formSumited = false;
            this.registerForm.reset();
            if(resp.token){
              this.router.navigate(['/dashboard']);
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error with connection!',
              });
            }
          }
      },(err:any)=>{
        const {error} = err;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.msg}`.toUpperCase(),
        });
      });

    }
  }

  validateEntity(value: string): boolean {
    return !this.registerForm?.controls[value]?.valid && this.formSumited;
  }

  validateSamePassword() {
    const pwd1 = this.registerForm?.controls['password']?.value;
    const pwd2 = this.registerForm?.controls['password2']?.value;

    return pwd1 !== pwd2 && this.formSumited;
  }

  passEqual(pwd1: string, pwd2: string) {
    return (fg: FormGroup) => {
      const pwd1Control = fg?.get(pwd1);
      const pwd2Control = fg?.get(pwd2);

      if (pwd1Control?.value === pwd2Control?.value) {
        pwd2Control?.setErrors(null);
      } else {
        pwd2Control?.setErrors({ noIsEqual: true });
      }
    };
  }
}
