import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User, Userlogins } from '../../interface/userlogins';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUpActive: boolean = false;
  toggleSignUp(isSignUp: boolean) {
    this.isSignUpActive = isSignUp;
  }
  createAccountError: boolean = false;
  createAccountSuccess: boolean = false;
  createAccountMessage: string = '';
  signUpObj: User = {
    name: '',
    email: '',
    password: '',
  };
  confirmPassword: string = '';
  signInObj: Userlogins = {
    email: '',
    password: '',
  };
  clearMessages() {
    this.createAccountSuccess = false;
    this.createAccountError = false;
    this.createAccountMessage = '';
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UserService
  ) {}

  onRegister() {
    this.usersService.createUser(this.signUpObj).subscribe(
      (response) => {
        if (response.success) {
          this.createAccountSuccess = true;
          this.createAccountMessage = response.message;
          setTimeout(() => {
            this.isSignUpActive = false;
            this.clearMessages();
          }, 3000);
        } else {
          this.createAccountError = true;
          this.createAccountMessage = 'Error occurred while creating account';
          setTimeout(() => this.clearMessages(), 3000);
        }
      },
      (error) => {
        console.error('Error during registration:', error);
        this.createAccountError = true;
        this.createAccountMessage = 'Error occurred while creating account';
        setTimeout(() => this.clearMessages(), 3000);
      }
    );
  }
  onLogin() {
    this.authService
      .login(this.signInObj.email, this.signInObj.password)
      .subscribe({
        next: (response: { success: any; data: { role: string } }) => {
          if (response.success) {
            this.createAccountSuccess = true;
            this.createAccountMessage = 'Login successful';
            // this.authService.isLoggedIn = true;
            setTimeout(() => this.clearMessages(), 3000);
            setTimeout(() => {
              if (response.data.role === 'user') {
                this.router.navigate(['userdashboard']);
              } else {
                this.router.navigate(['admindashboard']);
              }
            }, 4000);
          }
        },
        error: (error) => {
          this.createAccountError = true;
          this.createAccountMessage = 'Email or password is incorrect';
          setTimeout(() => this.clearMessages(), 3000);
        },
      });
  }
}
