import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersDetailsComponent } from './customer-orders-details.component';

describe('CustomerOrdersDetailsComponent', () => {
  let component: CustomerOrdersDetailsComponent;
  let fixture: ComponentFixture<CustomerOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
