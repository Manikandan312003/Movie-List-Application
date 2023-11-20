import { Component ,Inject} from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

//Delete Confirm
import { ConfirmationDialogComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css'],
})
export class MovieinfoComponent {
    //rating
  stars = [1, 2, 3, 4, 5];
  otherUserRatings = [3, 4, 5, 2, 4,1,2,3,4,5,5]; 
  
    ratingDetails = {
      user_rating:0,
      text:'',
      id:0,
      userid:0
    }
  userRating: number = 0; 
  


  rateMovie() {
    this.ratingDetails.user_rating = this.userRating;
  }

  hoverRate(star: number) {
    this.userRating = star;
  }

  resetHover() {
    this.userRating=this.ratingDetails.user_rating;
  }


  constructor(private service:ApiserviceService,private route:ActivatedRoute,private router:Router,public dialog:MatDialog,private toast:ToastrService){}
      movieid=0;
      movie:any;
      
      deleteMovie(id: number,name: string) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent,{data:{id:id,name:name}});

        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.service.getrequest('deletemovie?id='+id).subscribe((response)=>{
                var res=response as {status:any}
            if(res.status=="success"){
            
            this.toast.success('Suspect Id:'+id+' Deleted',"Deleted Successfully");
    
            }});
    }});
    }

        addrating(){
          
            if(!this.service.userLoggedIn){
              this.toast.error("You Need to be Logged in");
              this.router.navigateByUrl('/login')
              return
            }
            this.ratingDetails.userid=parseInt(this.service.loggedInUserId);
          this.service.post('/addrating',this.ratingDetails).subscribe(
            (result)=>{
              console.log(result)
              if((result as {'status':any}).status=='success'){
                this.toast.success("review added");
                this.loadDetails();
                
              }
            }
          )
        }

      ngOnInit(){
        this.route.queryParams.subscribe(params => {
          this.movieid = params['id'];
          
          if(!this.movieid){
            this.route.params.subscribe(params=>{
              this.movieid =params['id'];
              this.ratingDetails.id=params['id'];
            })
          }
          if(this.movieid){
            this.loadDetails();
          }
        });

        
      console.log(this.movie)
    }

    loadDetails(){
      var url = 'getmoviedetails?id='+this.movieid
            console.log(url)
            this.service.getrequest(url).subscribe(
              result=>{
                console.log(result)
                const resultData = result as { movie: any[] }; 
                this.movie=resultData.movie
                console.log(resultData.movie)
                console.log(this.movie.rating_details)
                 if(this.movie.rating_details){
                  for(var i=0;i<this.movie.rating_details.length;i++){
                    console.log(this.movie.rating_details[i]['userid'])
                      if(this.movie.rating_details[i]['userid']==this.service.loggedInUserId){
                        
                        this.ratingDetails=JSON.parse(JSON.stringify((this.movie.rating_details[i])));
                      }
                      
                    }
                    console.log(this.ratingDetails)
              }
              }

              
            )
            
    }



}


