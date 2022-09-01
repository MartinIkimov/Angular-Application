import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  editPostFormGroup: UntypedFormGroup = this.formBuilder.group({
    title: new UntypedFormControl('', [Validators.required]),
    categories: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  })

  currentPost: IPost;

  constructor(private formBuilder: UntypedFormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      this.postService.loadPostById$(postId).subscribe(
        post => {
          this.currentPost = post;
          console.log(post)
          setTimeout(() => {
            let array = Object.values(this.currentPost.categories);
            let categories: string;
            let arrayofCategories: string[] = [];
            array.forEach( (element) => {
              
              categories = element['name'];
              arrayofCategories.push(element['name'])
            });

            var string = arrayofCategories.join(', ')

            this.editPostFormGroup.patchValue({
              title: this.currentPost.title,
              categories: string,
              description: this.currentPost.description
            })
          })
        }
      )
    })

    
  }


  selectedFile: File;
  imageName: any;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  editPost() {
    const uploadImageData = new FormData();

    const { title, categories, description } = this.editPostFormGroup.value;

    if (this.selectedFile == null) {
      uploadImageData.append('imageFile', null);
    } else {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    uploadImageData.append('title', title);
    uploadImageData.append('categories', categories);
    uploadImageData.append('description', description);

    if(title.trim() == '' || categories.trim() == '' || description.trim() == '') {
      alert('Please fill all required inputs!');
      return;
    }

    this.postService.editPost$(uploadImageData, this.currentPost.id);
  
      this.postService.getAllPosts$().subscribe(() => {
        this.router.navigate(['/posts/all']);
      });
  }

}
