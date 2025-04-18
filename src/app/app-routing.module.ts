import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';


const routes: Routes = [
  { 
    path: "",
    redirectTo: "/signin",
    pathMatch: "full"
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "post/all",
    component: AllPostsComponent
  },
  {
    path: "post/new",
    component: PostNewComponent
  },
  {
    path: "post/edit",
    component: PostEditComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "profile/edit",
    component: ProfileEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
