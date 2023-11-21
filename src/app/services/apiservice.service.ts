import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  backendUrl = 'http://127.0.0.1:5000'
  // backendUrl = 'http://d32b-35-245-25-78.ngrok.io'
  // backendUrl = 'https://movie-list--massmaniraja11.repl.co/'
  userLoggedIn: boolean=false;
  loggedInUserId: string='';
  isadmin:Boolean=false;
  
  constructor(private http: HttpClient) { 
    
    console.log(JSON.stringify(localStorage.getItem("userId")))
    var userid=localStorage.getItem('userId')
    var isadmin=localStorage.getItem('isadmin')

    if(userid!=null){
      this.loggedInUserId=(userid);
      
      this.userLoggedIn=true;
    }
    if(isadmin!=null && isadmin!='0'){
      this.isadmin=true;
      
    }
    
    else{
      this.userLoggedIn=false
       
    }
  }
  
  getrequest(url:string) {
    if(!url.startsWith('/')){
      url='/'+url;
    }
    return this.http.get(this.backendUrl+url);
  }

  post(url: string, arg: any) {
    if(!url.startsWith('/')){
      url='/'+url;
    }
    console.log(this.backendUrl+url)
    return this.http.post(this.backendUrl+url,arg);
  }
}
