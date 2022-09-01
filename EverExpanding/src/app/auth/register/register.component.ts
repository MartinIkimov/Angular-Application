import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  passwordControl = new UntypedFormControl('', [Validators.required]);

  get passwordsGroup(): UntypedFormGroup {
    return this.registerFormGroup.controls['passwords'] as UntypedFormGroup;
  }

  registerFormGroup: UntypedFormGroup = this.formBuilder.group({
    'username': new UntypedFormControl('', [Validators.minLength(3), Validators.required]),
    'email': new UntypedFormControl('', [Validators.required, Validators.email]),
    'passwords': new UntypedFormGroup({
      'password': this.passwordControl,
      'rePassword': new UntypedFormControl('', [passwordMatch(this.passwordControl)])
    })
  })


  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: UntypedFormGroup = this.registerFormGroup) {
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