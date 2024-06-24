import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHomedashboardComponent } from './users-homedashboard.component';

describe('UsersHomedashboardComponent', () => {
  let component: UsersHomedashboardComponent;
  let fixture: ComponentFixture<UsersHomedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersHomedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersHomedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
