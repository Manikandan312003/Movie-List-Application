import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:"",redirectTo:'/login',pathMatch:'full',title:'Login'},
  {path:"allmovies",component:AllmoviesComponent,title:'All Movies'},
  {path:"movie",component:MovieinfoComponent,title:'All Movies'},
  {path:"movie/:id",component:MovieinfoComponent,title:'All Movies'},
  {path:"editmovie",component:EditmovieComponent,title:'Edit Movie'},
  {path:"editmovie/:id",component:EditmovieComponent,title:'Edit Movie'},
  {path:"addmovie",component:AddmovieComponent,title:'Add Movie'},
  {path:"login",component:LoginComponent,title:'Login'},
  {path:"signup",component:SignupComponent,title:'Sign Up'},
  {path: '**', redirectTo: '/login', pathMatch: 'full' ,title:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
