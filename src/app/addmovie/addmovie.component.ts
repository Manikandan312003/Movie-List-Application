import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {
selectedFileName: any;
      constructor(private service:ApiserviceService,private toast:ToastrService){}
      addMovie() {
        if(!this.service.isadmin){
          this.toast.error("You Need to be Admin");
          return
        }

        
        const formData = new FormData();
        formData.append('name', this.newMovie.name);
        formData.append('director', this.newMovie.director);
        formData.append('release_date', this.newMovie.release_date);
        formData.append('language', this.newMovie.language);
        formData.append('duration', this.newMovie.duration);
        formData.append('genre', this.newMovie.genre);
        formData.append('description', this.newMovie.description);
        if(this.movie_image){
            formData.append('movie_image', this.movie_image);
          }
        this.service.post('/addmovies',formData).subscribe(
          result=>{
            console.log(result)
            if((result as {'status':any}).status=='success'){
              this.toast.success("Successfully Added",this.newMovie.name);
            }
            else{
              this.toast.error("Error",(result as {'status':any}).status);
            }
          }
        )
      }

       newMovie={
            name:'',
            director:'',
            release_date:'',
            language:'',
            duration:'',
            genre:'',
            description:'',
          }
          movie_image:File|undefined;

      onFileSelected(event: any): void {
        if((event.target.files[0]?.type.startsWith('image'))){
          this.movie_image = event.target.files[0];
          this.selectedFileName=this.movie_image?.name;
        }
        else{
          this.toast.error("Please choose Photo")
        }
        console.log(this.movie_image)
      }
  
      createObjectURL(file: File): string {
        return URL.createObjectURL(file);
      }
}
