import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';

  passwordControl = new FormControl('', [Validators.required]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl('', [Validators.minLength(3), Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl('', [passwordMatch(this.passwordControl)])
    })
  })


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid
  }

  handleRegister(): void {
    const { username, email, passwords } = this.registerFormGroup.value;

    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password
    }

    this.userService.register$(body.username, body.email, body.password).subscribe(
      data => {
        this.router.navigate(['/users/login'])
      },
      err => {
        this.errorMessage = err.error;
      }
    )
  }

}