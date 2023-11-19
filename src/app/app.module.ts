import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//App component
import {MatCardModule} from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';


//all movies
import {MatGridListModule} from '@angular/material/grid-list';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { EditmovieComponent } from './editmovie/editmovie.component'
import {MatDialogModule} from '@angular/material/dialog';

//Edit
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddmovieComponent } from './addmovie/addmovie.component';

//Add Movie
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AllmoviesComponent,
    MovieinfoComponent,
    EditmovieComponent,
    AddmovieComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatCardModule,MatSidenavModule,MatIconModule,MatToolbarModule,MatButtonModule,HttpClientModule,

    //All Movies
    MatGridListModule,MatDialogModule,

    //Edit Movies
    MatFormFieldModule,MatInputModule,FormsModule,MatDatepickerModule,ReactiveFormsModule,MatNativeDateModule,
    ToastrModule.forRoot(
      {positionClass:'toast-top-center',
      maxOpened:5,
    
  }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
