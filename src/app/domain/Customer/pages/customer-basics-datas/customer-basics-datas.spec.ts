import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBasicsDatas } from './customer-basics-datas';

describe('CustomerBasicsDatas', () => {
  let component: CustomerBasicsDatas;
  let fixture: ComponentFixture<CustomerBasicsDatas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerBasicsDatas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBasicsDatas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
