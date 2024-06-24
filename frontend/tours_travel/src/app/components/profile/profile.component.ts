import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interface/userlogins';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user_id: string | null = '';
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.user_id = this.authService.getUserID();
  }

  updateProfileError: boolean = false;
  updateProfileSuccess: boolean = false;
  updateProfileMessage: string = '';
  updateProfileObj: User = {
    name: '',
    email: '',
    password: '',
  };
  loadUserProfile() {
    if (this.user_id) {
      console.log('user_id:', this.user_id);
      this.userService.getuserProfile(this.user_id).subscribe(
        (response) => {
          if (response.success && response.data && response.data.user) {
            const { name, email } = response.data.user;
            this.updateProfileObj.name = name;
            this.updateProfileObj.email = email;
          } else {
          }
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }
  onProfileUpdate() {}
}
