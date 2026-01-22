import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonIcon } from './button-icon';

describe('ButtonIcon', () => {
  let component: ButtonIcon;
  let fixture: ComponentFixture<ButtonIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonIcon);
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

  it('should render button with btn-icon class', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.classList.contains('btn-icon')).toBe(true);
  });

  it('should have type button', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.type).toBe('button');
  });
});
