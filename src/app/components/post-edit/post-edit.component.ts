import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post = new Post();
  postId: string = '';

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.postService.getPost(this.postId).subscribe(
      (data: Post) => {
        this.post = data;
      },
      (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/signin']);
        } else {
          console.error(error);
        }
      }
    );
  }

  updatePost(): void {
    this.postService.updatePost(this.post).subscribe(
      () => {
        alert('Post has been updated successfully.');
        this.router.navigate(['/post/all']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/signin']);
        } else {
          console.error(error);
        }
      }
    );
  }
}
