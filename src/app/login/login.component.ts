import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service:ApiserviceService,private toast:ToastrService,private router:Router,private location:Location){}

  details={
    email:'',
  password:''
  }

  ngOnInit(){
    
    if(this.service.userLoggedIn==true){
      this.router.navigateByUrl('allmovies')
    }
  }

login() {
  this.service.post('login',this.details).subscribe(
    (res)=>{
      console.log(res)
      var result = res as {
        isadmin: string;
        useremail: string;
        userid: string;'status':any,'userId':any,'username':any
}
      if(result.status=='success'){
          console.log(result) 
          localStorage.setItem("userId",result.userid)
          localStorage.setItem("username",result.username)
          localStorage.setItem("isadmin",result.isadmin)
          this.service.userLoggedIn=true
          console.log(result?.['userid'])
          
          this.service.loggedInUserId=result?.['userid']
          this.router.navigateByUrl('allmovies')
          this.toast.success("Login successfully","Welcome "+result?.['username'])
        }
        else{console.log(result)
          this.toast.error(result.status)
        }
      
      
    }
  )
}

  
}
