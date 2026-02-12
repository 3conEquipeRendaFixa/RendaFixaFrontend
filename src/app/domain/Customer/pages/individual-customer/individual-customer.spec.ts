import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNaturalPerson } from './customer-natural-person';

describe('CustomerNaturalPerson', () => {
  let component: CustomerNaturalPerson;
  let fixture: ComponentFixture<CustomerNaturalPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerNaturalPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerNaturalPerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
