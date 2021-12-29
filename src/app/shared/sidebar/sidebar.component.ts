import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public userimage!:string;
  public userProfile!:any;

  menuItems!:any[];
  constructor(private sidebarService: SidebarService,private authService:AuthService) { 
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
    this.userimage = this.authService.getUserImagePath;
    this.userProfile = this.authService.getUserProfile();
  }

  logout(){
    this.authService.logOut();
  }
}
