import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSecondary } from './button-secondary';

describe('ButtonSecondary', () => {
  let component: ButtonSecondary;
  let fixture: ComponentFixture<ButtonSecondary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSecondary],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSecondary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked when button is clicked', () => {
    const clickedSpy = vi.fn();
    component.clicked.subscribe(clickedSpy);

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickedSpy).toHaveBeenCalled();
  });

  it('should render button with btn-secondary class', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.classList.contains('btn-secondary')).toBe(true);
  });

  it('should have type button', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.type).toBe('button');
  });
});
