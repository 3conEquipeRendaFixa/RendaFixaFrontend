import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonPrimary } from './button-primary';

describe('ButtonPrimary', () => {
  let component: ButtonPrimary;
  let fixture: ComponentFixture<ButtonPrimary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPrimary],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonPrimary);
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

  it('should render button with btn-primary class', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.classList.contains('btn-primary')).toBe(true);
  });

  it('should have type button', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.type).toBe('button');
  });
});
