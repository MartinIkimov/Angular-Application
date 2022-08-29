import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css']
})
export class PostsAddComponent implements OnInit {

  addPostFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })


  constructor(private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
  }

  selectedFile: File;
  imageName: any;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addPost() {
    const uploadImageData = new FormData();

    const { title, categories, description } = this.addPostFormGroup.value;

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


    this.postService.addPost$(uploadImageData);
    setTimeout(() => {
      this.postService.getAllPosts$();
    }, 5);
    this.router.navigate(['/posts/all']).then(() => {
      window.location.reload();
    });
  }
}
