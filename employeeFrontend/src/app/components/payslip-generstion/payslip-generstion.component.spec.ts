import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipGenerstionComponent } from './payslip-generstion.component';

describe('PayslipGenerstionComponent', () => {
  let component: PayslipGenerstionComponent;
  let fixture: ComponentFixture<PayslipGenerstionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipGenerstionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipGenerstionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
