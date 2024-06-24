import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSidenavComponent } from './users-sidenav.component';

describe('UsersSidenavComponent', () => {
  let component: UsersSidenavComponent;
  let fixture: ComponentFixture<UsersSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
