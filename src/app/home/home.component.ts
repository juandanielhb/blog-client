import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts: any[] = [];
  postForm: any;
  editPostForm: any;
  commentForm: any;
  editCommentForm: any;

  constructor(
    private fb: FormBuilder,
    private _postService: PostService,
    private _commentService: CommentService,
  ) {
    this.postForm = this.fb.group({
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
    });

    this.editPostForm = this.fb.group({
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
    });

    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.editCommentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPost();
  }

  createPost() {
    if (this.postForm.valid) {
      const postTitle = this.postForm.get('postTitle').value;
      const postContent = this.postForm.get('postContent').value;
      let post = {
        title: postTitle,
        content: postContent
      }

      this._postService.create(post)
        .subscribe((data: any) => {
          this.getPost();
          this.postForm.reset();
        });

    }
  }

  deletePost(postId: string){
    this._postService.delete(postId)
    .subscribe(() => {
      this.getPost();
    });
  }

  addComment(postId: string) {
    if (this.commentForm.valid) {
      const text = this.commentForm.get('text').value;

      let comment = {text};

      this._commentService.create(postId, comment)
        .subscribe(() => {
          this.getPost();
          this.commentForm.reset();
        });

    }
  }

  deleteComment(postId:string, commentId: string){
    this._commentService.delete(postId, commentId)
    .subscribe(() => {
      this.getPost();
    });
  }

  getPost(){
    this._postService.getAll()
    .subscribe((data: any) => {
      this.posts = data;
      this.posts.forEach(post => {
        post.isEditing = false;
      });
    });
  }
  
}
