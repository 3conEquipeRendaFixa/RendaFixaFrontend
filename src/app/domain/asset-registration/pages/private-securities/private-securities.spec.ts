import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSecurities } from './private-securities';

describe('PrivateSecurities', () => {
  let component: PrivateSecurities;
  let fixture: ComponentFixture<PrivateSecurities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateSecurities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateSecurities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
