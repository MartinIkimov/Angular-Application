import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { TokenStorageService } from 'src/app/core/token-storage.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  isLoggedIn = false;
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      }
    }

  handleLogin(): void {
    this.errorMessage = '';
    const {username, password} = this.loginFormGroup.value;
    this.userService.login$(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/home'])
        setTimeout(() => {
          this.reloadPage();
        }, 1)
      },
      err => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
