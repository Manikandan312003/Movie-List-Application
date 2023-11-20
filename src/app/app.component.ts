import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './services/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router:Router,public service:ApiserviceService){}
  title = 'Movie-List';
  


  logout(){
    this.service.loggedInUserId='0';
    this.service.userLoggedIn=false;
    localStorage.clear()
    this.router.navigateByUrl('\login')
  }
}
