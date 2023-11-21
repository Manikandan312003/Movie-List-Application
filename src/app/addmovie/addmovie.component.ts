import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
  providers:[DatePipe]
})
export class AddmovieComponent {
selectedFileName: any;
      
      constructor(private service:ApiserviceService,private toast:ToastrService,private datepipe:DatePipe){}
      addMovie() {
        if(!this.service.isadmin){
          this.toast.error("You Need to be Admin");
          return
        }

        
        const formData = new FormData();
        formData.append('name', this.newMovie.name);
        formData.append('director', this.newMovie.director);
        formData.append('release_date', this.datepipe.transform(this.newMovie.release_date,'dd-MM-YYYY')||'');
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


@Component({
  selector: 'app-time',
  template:`
    <mat-form-field appearance="fill" class="full-width">
          <mat-label>Duration</mat-label>
           <span> <input matInput
                type="text"
                placeholder="hh"
                [(ngModel)]="hours"
                (input)="onHoursChange($event)"
                />
            <span>:</span>
            <input matInput
            type="text"
            placeholder="mm"
            [(ngModel)]="minutes"
            (input)="onMinutesChange($event)"
            />
           </span>
          
    </mat-form-field>

    
`,
  styleUrls: ['./addmovie.component.css'],
  imports:[FormsModule,MatFormFieldModule,MatInputModule,FormsModule],
  standalone:true,
  providers:[]
})
export class TimeComponent {

  hours: string = '';
  minutes: string = '';

  onHoursChange(event: any): void {
    this.hours = event.target.value;
    this.updateTime();
  }

  onMinutesChange(event: any): void {
    this.minutes = event.target.value;
    this.updateTime();
  }

  updateTime(): void {
    const formattedTime = `${this.hours}:${this.minutes}`;
    console.log(`Selected Time: ${formattedTime}`);
    // You can handle the selected time logic here
  }
}