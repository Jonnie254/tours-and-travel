import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEdiUserComponent } from './admin-edi-user.component';

describe('AdminEdiUserComponent', () => {
  let component: AdminEdiUserComponent;
  let fixture: ComponentFixture<AdminEdiUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEdiUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEdiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
