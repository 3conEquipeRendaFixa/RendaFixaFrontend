import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalendarViewModal } from './calendar-view-modal';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';

describe('CalendarViewModal', () => {
  let component: CalendarViewModal;
  let fixture: ComponentFixture<CalendarViewModal>;

  const mockCalendarItem: CalendarItem = {
    instituicao: 'B3',
    praca: 'São Paulo',
    segmento: 'Cetip UTVM',
    processo: 'Registro',
    sabadoUtil: true,
    domingoUtil: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarViewModal, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarViewModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be closed by default', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should have null calendarItem by default', () => {
    expect(component.calendarItem()).toBeNull();
  });

  it('should have current year as selectedYear', () => {
    expect(component.selectedYear).toBe(new Date().getFullYear());
  });

  it('should emit closeModal when onClose is called', () => {
    const closeSpy = vi.fn();
    component.closeModal.subscribe(closeSpy);

    component.onClose();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should have holidays computed', () => {
    const holidays = component.holidays();

    expect(holidays.length).toBe(10);
    expect(holidays[0].descricao).toContain('Confraternização Universal');
  });

  it('should not render modal when closed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.modal-overlay')).toBeFalsy();
  });

  it('should render modal when open', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('calendarItem', mockCalendarItem);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.modal-overlay')).toBeTruthy();
    expect(compiled.querySelector('.modal-container')).toBeTruthy();
  });

  it('should display calendar item data when open', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('calendarItem', mockCalendarItem);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const instituicaoInput = compiled.querySelector('#instituicao-field') as HTMLInputElement;

    expect(instituicaoInput?.value).toBe('B3');
  });

  it('should log export message when onExport is called', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    component.onExport();

    expect(consoleSpy).toHaveBeenCalledWith('Exportar calendário');
  });
});
