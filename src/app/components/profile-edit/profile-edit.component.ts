import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editForm!: FormGroup;
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      bio: [''],
      location: ['']
    });

    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this.loadUserProfile(userId);
    }
  }

  loadUserProfile(userId: string): void {
    this.userService.getUser(userId).subscribe(
      (data: User) => {
        this.user = data;
        this.editForm.patchValue(data);
      },
      (error: any) => {
        console.error(error);
        this.router.navigate(['/login']);
      }
    );
  }

  onUpdateFormSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: User = {
        id: this.user.id,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        password: this.editForm.value.password,
        bio: this.editForm.value.bio,
        location: this.editForm.value.location
      };

      this.userService.updateUser(updatedUser).subscribe(
        () => {
          alert('Profile updated successfully');
          this.router.navigate(['/post/all']);
        },
        (error: any) => {
          console.error(error);
          alert('Error updating profile');
        }
      );

      this.cancelUpdate();
    }
  }

  cancelUpdate(): void {
    this.editForm.reset();
    this.router.navigate(['/some-other-route']); // Replace with appropriate route
  }
}