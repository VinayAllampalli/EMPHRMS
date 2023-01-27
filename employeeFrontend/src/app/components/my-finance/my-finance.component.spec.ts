import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFinanceComponent } from './my-finance.component';

describe('MyFinanceComponent', () => {
  let component: MyFinanceComponent;
  let fixture: ComponentFixture<MyFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
