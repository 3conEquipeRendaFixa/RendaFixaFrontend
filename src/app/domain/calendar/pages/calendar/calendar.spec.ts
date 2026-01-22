import { ComponentFixture, TestBed } from '@angular/core/testing';
import Calendar from './calendar';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar],
    }).compileComponents();

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have modal closed by default', () => {
    expect(component.isModalOpen()).toBe(false);
  });

  it('should have null selectedItem by default', () => {
    expect(component.selectedItem()).toBeNull();
  });

  it('should have 4 calendar items', () => {
    expect(component.calendarItems().length).toBe(4);
  });

  it('should open modal and set selected item on row click', () => {
    const item: CalendarItem = component.calendarItems()[0];

    component.onRowClick(item);

    expect(component.isModalOpen()).toBe(true);
    expect(component.selectedItem()).toBe(item);
  });

  it('should close modal and clear selected item on close', () => {
    const item: CalendarItem = component.calendarItems()[0];
    component.onRowClick(item);

    component.onCloseModal();

    expect(component.isModalOpen()).toBe(false);
    expect(component.selectedItem()).toBeNull();
  });

  it('should log on search', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    component.onSearch();

    expect(consoleSpy).toHaveBeenCalledWith('Pesquisar');
  });

  it('should log on clear', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    component.onClear();

    expect(consoleSpy).toHaveBeenCalledWith('Limpar filtros');
  });

  it('should render page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.page-title')?.textContent).toContain('Calendário por Praça');
  });

  it('should render breadcrumb', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.breadcrumb')).toBeTruthy();
  });
});
