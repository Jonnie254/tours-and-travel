import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdmintourViewComponent } from '../admintour-view/admintour-view.component';

@Component({
  selector: 'app-admin-edi-user',
  standalone: true,
  templateUrl: './admin-edi-user.component.html',
  styleUrl: './admin-edi-user.component.css',
  imports: [NavbarComponent, AdmintourViewComponent],
})
export class AdminEdiUserComponent {}
