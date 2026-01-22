import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarGrid } from './calendar-grid';
import { CalendarItem } from '@domain/calendar/types/calendar.interface';

describe('CalendarGrid', () => {
  let component: CalendarGrid;
  let fixture: ComponentFixture<CalendarGrid>;

  const mockItems: CalendarItem[] = [
    { instituicao: 'B3', praca: 'São Paulo', segmento: 'Cetip UTVM', processo: 'Registro', sabadoUtil: true, domingoUtil: false },
    { instituicao: 'BCB', praca: 'São Paulo', segmento: 'Selic', processo: 'Liquidação', sabadoUtil: false, domingoUtil: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty items by default', () => {
    expect(component.items()).toEqual([]);
  });

  it('should emit rowClick when onRowClick is called', () => {
    const rowClickSpy = vi.fn();
    component.rowClick.subscribe(rowClickSpy);

    const item = mockItems[0];
    component.onRowClick(item);

    expect(rowClickSpy).toHaveBeenCalledWith(item);
  });

  it('should format boolean true as Sim', () => {
    expect(component.formatBoolean(true)).toBe('Sim');
  });

  it('should format boolean false as Não', () => {
    expect(component.formatBoolean(false)).toBe('Não');
  });

  it('should render table headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('th');

    expect(headers.length).toBeGreaterThan(0);
    expect(headers[0].textContent).toContain('Instituição');
  });

  it('should display correct number of results', async () => {
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.grid-footer');

    expect(footer?.textContent).toContain('2 resultados disponíveis');
  });
});
