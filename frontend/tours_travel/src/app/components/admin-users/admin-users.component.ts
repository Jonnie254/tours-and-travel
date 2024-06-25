import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/userlogins';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  constructor(private userservice: UserService) {}
  users: User[] = [];
  editedUser: User = {
    name: '',
    email: '',
    password: '',
  };
  faEdit = faEdit;
  faDeleteLeft = faDeleteLeft;
  deleteAccountError: boolean = false;
  deleteAccountSuccess: boolean = false;
  deleteAccountMessage: string = '';
  clearMessages() {
    this.deleteAccountSuccess = false;
    this.deleteAccountError = false;
    this.deleteAccountMessage = '';
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userservice.getAllUsers().subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          this.users = users;
        } else {
        }
      },
      (error) => {}
    );
  }

  deleteUser(userId: string): void {
    this.userservice.deleteUser(userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.deleteAccountSuccess = true;
          this.deleteAccountMessage = 'User deleted successfully';
          setTimeout(() => {
            this.deleteAccountSuccess = false;
            this.deleteAccountMessage = '';
          }, 3000);
          this.getAllUser();
        } else {
          this.deleteAccountError = true;
          this.deleteAccountMessage = 'Error occurred while deleting user';
          setTimeout(() => {
            this.deleteAccountError = false;
            this.deleteAccountMessage = '';
          }, 3000);
        }
      },
      error: (error) => {
        this.deleteAccountError = true;
        this.deleteAccountMessage = 'Error occurred while deleting user';
        setTimeout(() => {
          this.deleteAccountError = false;
          this.deleteAccountMessage = '';
        }, 3000);
      },
    });
  }
}
