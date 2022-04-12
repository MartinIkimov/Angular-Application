import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  currentUser: any;

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.userService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    })
  }

}
