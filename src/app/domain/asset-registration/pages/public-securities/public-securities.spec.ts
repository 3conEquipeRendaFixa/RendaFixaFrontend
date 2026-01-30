import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSecurities } from './public-securities';

describe('PublicSecurities', () => {
  let component: PublicSecurities;
  let fixture: ComponentFixture<PublicSecurities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSecurities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSecurities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
