import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintourViewComponent } from './admintour-view.component';

describe('AdmintourViewComponent', () => {
  let component: AdmintourViewComponent;
  let fixture: ComponentFixture<AdmintourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmintourViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
