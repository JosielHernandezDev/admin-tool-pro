import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public userimage!:string;
  public userProfile!:User;

  constructor(private authService:AuthService) { 
    this.userimage = this.authService.getUserImagePath;
    this.userProfile = this.authService. getUserProfile();
  }

  ngOnInit(): void {
  
  }

  logout(){
    this.authService.logOut();
  }
}
