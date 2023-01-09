import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreationComponent } from './emp-creation.component';

describe('EmpCreationComponent', () => {
  let component: EmpCreationComponent;
  let fixture: ComponentFixture<EmpCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
