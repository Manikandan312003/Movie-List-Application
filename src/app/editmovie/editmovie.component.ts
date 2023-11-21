import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css'],
  providers:[DatePipe]
})
export class EditmovieComponent {
  
  
  constructor(private service:ApiserviceService,private route:ActivatedRoute,private datepipe:DatePipe,private toast:ToastrService){}
  movieid=0;
  movie:any={release_date:new Date()};
  originalmovieDetail:any={release_date:new Date()}
  releaseDateControl = new FormControl(this.movie.release_date);
  
  areObjectsEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    console.log(obj1,obj2)
    
    if (keys1.length !== keys2.length) {
      return false;
    }
    
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    
    return true;
  }
  donothing(){
    
  }
  
  savechanges() {
    if(this.service.isadmin==false){
      this.toast.error("You Need to be Admin");
      return 
    }
    console.log(this.originalmovieDetail,this.movie)
    if(!this.areObjectsEqual(this.originalmovieDetail,this.movie)){
      console.log(this.originalmovieDetail,this.movie)
        this.service.post('updatemovie',this.movie).subscribe(res=>{
          console.log(res)
          var rest=res as { status: string }; 
          if(rest.status=='success'){
            this.getDetails();
            this.toast.success("Saved Successfully");
          }
        });
    }
  }
  
  onDateChange(event: any) {
    console.log('Selected Date:', event.value);
    if(event.value){
      this.movie.release_date = this.datepipe.transform(event.value,'yyyy-MM-dd');
  console.log(this.movie.release_date)}
    
  }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.movieid = params['id'];
      
      if(!this.movieid){
        this.route.params.subscribe(params=>{
          this.movieid =params['id'];
          
        })
      }
      if(this.movieid){
        this.getDetails();
      }
    });

    
  console.log(this.movie)
}

  getDetails() {
        var url = 'getmoviedetails?id='+this.movieid;
        this.service.getrequest(url).subscribe(
          result=>{
            console.log(result)
            const resultData = result as { movie: any[] }; 
            this.movie=resultData.movie
            console.log(resultData.movie)
            this.originalmovieDetail=JSON.parse(JSON.stringify(this.movie));
          }
        )
}
}

