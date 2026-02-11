import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFatca } from './customer-fatca';

describe('CustomerFatca', () => {
  let component: CustomerFatca;
  let fixture: ComponentFixture<CustomerFatca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFatca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFatca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
