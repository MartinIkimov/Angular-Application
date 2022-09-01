import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/core/interfaces/comment';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.css']
})
export class PostDetailPageComponent implements OnInit {

  post: IPost;
  comments: IComment[];
  isInEditMode: boolean = false;

  @ViewChild('f') form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      this.postService.loadPostById$(postId).subscribe(
        post => {
          this.post = post;
        }
      )
    })

    this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      this.postService.getCommentsByPostId$(postId).subscribe(
        comment => {
          this.comments = comment;
        }
      )
    })
    
  }

  onSubmit() {
    const {message} = this.form.value;

    const body = {
      'message': message
    }

    this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      this.postService.postComment$(body, postId).subscribe(
        message => {
          this.postService.getCommentsByPostId$(postId).subscribe(
            comment => {
              this.comments = comment;
            }
          )
        }
      )
    })

    this.form.reset();
  }

  deletePost() {
    this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      this.postService.deletePost$(postId)
      .subscribe(() => {
        this.postService.getAllPosts$();
        this.router.navigate(['/posts/all'])
      });
    })
  }
}
