import { Component,Inject } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ConfirmationDialogComponent } from '../delete/delete.component';
//Grid
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


//Delete Confirm
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.css']
})


export class AllmoviesComponent {

    movies: any;
  cols$: Observable<number>;
    

        
  showFilters: boolean=false;
  filteredMovies: any;
  filterCriteria = {
    name: '',
    director: '',
    language: '',
    rating: 0,
    genre:'',
    duration:'',
    releaseYearFrom: new Date(),
    releaseYearTo: new Date()
  };

  applyFilters() {
    this.filteredMovies = this.movies.filter((movie:Movie) => {
        for (const key in this.filterCriteria) {
            if (key === 'releaseYearFrom') {
              if (this.filterCriteria.releaseYearFrom && movie.release_date < this.filterCriteria.releaseYearFrom) {
                  console.log(key);
                return false;
              }
            } else if (key === 'releaseYearTo') {
              if (this.filterCriteria.releaseYearTo && movie.release_date > this.filterCriteria.releaseYearTo) {
                  console.log(key);
                return false;
              }
            } else if (key !== 'name' && key !== 'director' && key !== 'language' && key !== 'rating' && key!='genre' && key!='duration' ) {
                continue;
            } else if (this.filterCriteria[key] && !(''+movie[key]).toLowerCase().includes( (''+this.filterCriteria[key]).toLowerCase() )) {
                console.log(key,this.filterCriteria[key]);
                return false;
            }
        }
          return true;
        });
        
        this.toast.success("Filtered Applied Successfully");
      
    }

    resetFilters() {
        this.filteredMovies=this.movies;
        this.filterCriteria={
            name: '',
            director: '',
            language: '',
            rating: 0,
            genre:'',
            duration:'',
            releaseYearFrom: new Date(),
            releaseYearTo: new Date()
          };
          this.toast.success("Filter resetted Successfully")
        }


constructor(private breakpointObserver: BreakpointObserver , private service:ApiserviceService,public dialog:MatDialog,private toast:ToastrService){
    this.cols$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          return 2;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          return 3;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          return 4;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          return 5;
        }
        return 4; 
      }),
      shareReplay()
    );
  }
        
        deletemovie(id: number,name: string) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent,{data:{id:id,name:name}});

            dialogRef.afterClosed().subscribe((result) => {
              if (result === true) {
                this.service.getrequest('deletemovie?id='+id).subscribe((response)=>{
                    var res=response as {status:any}
                if(res.status=="success"){
                this.getMovieDetails();
                this.toast.success('Suspect Id:'+id+' Deleted',"Deleted Successfully");
        
                }});
        }});
        }
        ngOnInit(){

          

           this.getMovieDetails();
          console.log(this.movies)
        }

        getMovieDetails(){
            this.service.getrequest('getmovies').subscribe(
                result=>{
                  const resultData = result as { movie: any[] }; 
                  this.movies=resultData.movie
                  console.log(resultData.movie)
                  this.filteredMovies=this.movies
                }
              )
        }


}


interface Movie{
    name:string,
id:number,
director:string,
release_date:Date,
language:string,
rating:number,
genre:string,
duration:string,
}



