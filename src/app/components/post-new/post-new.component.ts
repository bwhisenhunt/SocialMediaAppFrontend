import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  newPost: Post = new Post();

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  addPost() {
    this.postService.createPost(this.newPost).subscribe(() => {
      window.alert("Created Post Successfully");
      this.router.navigate(['/post/all']);
    }, error => {
      console.log('Error: ', error)
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['/signin']);
      }
    });
  }
}
