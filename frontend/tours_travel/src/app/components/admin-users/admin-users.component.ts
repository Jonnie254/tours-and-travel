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

  editUser(userId: string): void {
    this.userservice.getuserProfile(userId).subscribe(
      (response: any) => {
        if (response.success) {
          this.editedUser = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
          };
        } else {
          console.error('User not found');
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  submitForm(): void {
    this.userservice.updateUser(this.editedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Optionally, clear the form or perform other actions upon successful update
        this.editedUser = { name: '', email: '', password: '' }; // Reset editedUser object
        this.getAllUser(); // Refresh the list of users
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
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
