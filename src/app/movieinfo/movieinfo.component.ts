import { Component ,Inject} from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ActivatedRoute } from '@angular/router';


//Delete Confirm
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent {
    //rating
  stars = [1, 2, 3, 4, 5];
  otherUserRatings = [3, 4, 5, 2, 4,1,2,3,4,5,5]; // Example other users' ratings
  
    ratingDetails = {
      user_rating:0,
      text:'',
      id:0
    }
  userRating: number = 0; // To track the user's rating
  


  rateMovie() {
    this.ratingDetails.user_rating = this.userRating;
  }

  hoverRate(star: number) {
    this.userRating = star;
  }

  resetHover() {
    this.userRating=this.ratingDetails.user_rating;
  }


  constructor(private service:ApiserviceService,private route:ActivatedRoute,public dialog:MatDialog,private toast:ToastrService){}
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
          this.service.post('/addrating',this.ratingDetails).subscribe(
            (result)=>{
              console.log(result)
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
            var url = 'getmoviedetails?id='+this.movieid
            console.log(url)
            this.service.getrequest(url).subscribe(
              result=>{
                console.log(result)
                const resultData = result as { movie: any[] }; 
                this.movie=resultData.movie
                console.log(resultData.movie)
              }
            )
          }
        });

        
      console.log(this.movie)
    }



}
export interface deleteSuspectinfo {
  id: number;
  name: string;
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: "./delete-prompt.html",
  standalone:true,
  imports:[MatButtonModule]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: deleteSuspectinfo
  ) {}

  confirmDeletion(): void {
    this.dialogRef.close(true);
  }

  cancelDeletion(): void {
    this.dialogRef.close(false); 
  }
}
