import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private service:ApiserviceService,private toast:ToastrService){}
    details={
      email:'',
    password:''
    }
    signup() {
        this.service.post('signup',this.details).subscribe(
          (res)=>{
            console.log(res)
            var result=res as {'status':any}
            if(result.status=='success'){
              this.toast.success("Successfully registered");
            }
          }
        )
    }
   

}
