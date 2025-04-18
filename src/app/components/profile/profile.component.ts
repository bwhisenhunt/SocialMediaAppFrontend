import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  userId: string = '';
  showUpdateForm: boolean = false;
  userToUpdate: User = new User();

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('Initializing ProfileEditComponent');
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUser(this.userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(error);
        }
      }
    );
  }

  updateUser(): void {
    this.showUpdateForm = true;
    this.userToUpdate = Object.assign({}, this.user);
  }

  editProfile(): void {
    console.log('Navigating to profile edit');
    this.router.navigate(['profile/edit'], { queryParams: { userId: this.userId } });
  }

  onUpdateFormSubmit(): void {
    this.userService.updateUser(this.userToUpdate).subscribe(
      () => {
        alert('User Profile updated successfully.');
        this.router.navigate(['/post/all']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(error);
        }
      }
    );

    this.cancelUpdate();
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.userToUpdate = new User();
  }
}