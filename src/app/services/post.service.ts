import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseURL: string = "https://localhost:7025/api/post";
  tokenKey: string = "myPostToken";

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL);
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseURL}/${postId}`);
  }

  createPost(newPost: Post): Observable<any> {
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.post(this.baseURL, newPost, { headers: reqHeaders });
  }

  updatePost(updatedPost: Post): Observable<any> {
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.put(`${this.baseURL}/${updatedPost.postId}`, updatedPost, { headers: reqHeaders });
  }

  deletePost(postId: string): Observable<any> {
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    return this.http.delete(`${this.baseURL}/${postId}`, { headers: reqHeaders });
  }
}