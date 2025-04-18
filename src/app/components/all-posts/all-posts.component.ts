import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  allPostsList: Post[] = [];
  router: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(post => {
      this.allPostsList = post;
    });
  }

  deletePost(id: string): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.allPostsList = this.allPostsList.filter(Post => Post.postId !== id);
      },
      error: (error) => {
        if (error.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
          this.router.navigate(['/signin']);
        } else {
          console.error(error);
        }
      }
    });
  }
}