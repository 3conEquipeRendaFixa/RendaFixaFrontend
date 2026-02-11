import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalendarFilter } from './calendar-filter';

describe('CalendarFilter', () => {
  let component: CalendarFilter;
  let fixture: ComponentFixture<CalendarFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarFilter, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty initial values', () => {
    expect(component.exchange).toBe('');
    expect(component.location).toBe('');
    expect(component.segment).toBe('');
    expect(component.process).toBe('');
  });

  it('should emit searchFilters when onSearch is called', () => {
    const searchSpy = vi.fn();
    component.searchFilters.subscribe(searchSpy);

    component.onSearch();

    expect(searchSpy).toHaveBeenCalled();
  });

  it('should clear all fields and emit clearFilters when onClear is called', () => {
    const clearSpy = vi.fn();
    component.clearFilters.subscribe(clearSpy);

    component.exchange = 'B3';
    component.location = 'São Paulo';
    component.segment = 'Cetip UTVM';
    component.process = 'Registro';

    component.onClear();

    expect(component.exchange).toBe('');
    expect(component.location).toBe('');
    expect(component.segment).toBe('');
    expect(component.process).toBe('');
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should render filter fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('#exchange')).toBeTruthy();
    expect(compiled.querySelector('#location')).toBeTruthy();
    expect(compiled.querySelector('#segment')).toBeTruthy();
    expect(compiled.querySelector('#process')).toBeTruthy();
  });
});
