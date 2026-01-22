import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonClose } from './button-close';

describe('ButtonClose', () => {
  let component: ButtonClose;
  let fixture: ComponentFixture<ButtonClose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonClose],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonClose);
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

  it('should render button with btn-close class', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.classList.contains('btn-close')).toBe(true);
  });

  it('should have type button', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.type).toBe('button');
  });

  it('should display close icon', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(button.textContent).toContain('✕');
  });
});
