import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/token-storage.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: UntypedFormGroup = this.formBuilder.group({
    username: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    password: new UntypedFormControl('', [Validators.required])
  })

  isLoggedIn = false;
  roles: string[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
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
    console.log(this.errorMessage)
  }
  reloadPage(): void {
    window.location.reload();
  }
}
