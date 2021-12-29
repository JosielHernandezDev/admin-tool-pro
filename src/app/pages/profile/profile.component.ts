import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilesUloadService } from 'src/app/services/files-uload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!:FormGroup;
  public img!:File;
  public profileImage!:string;

  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,private authService:AuthService,private fileUploadService:FilesUloadService) { 
    this.profileImage = this.authService.getUserImagePath;
  }
  
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    });
  }



  updateProfile(){
    console.log(this.profileForm);

    const uid = this.authService.uidUser;

    if(this.profileForm.valid){
      this.userService.updateProfile(uid,this.profileForm.value).subscribe((response:any)=>{
        if(response.success){
          //implement reload data
          this.authService.validateToken().subscribe((aca:any)=>{
            this.router.navigate(['/dashboard']);
          });
        }
      });
    }
    
  }

  preparedImg(file:any):any{
    this.imagenSubir = file?.files[0];

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file.files[0] );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage(){
    const uid = this.authService.uidUser;
    this.fileUploadService.updatePhoto(this.imagenSubir,'users',uid).then((res:any)=>{
      this.authService.setImage= res;          
    })
  }

  isGoogleAccoutn():boolean{
    return this.authService.user.google||false;
  }

}
