import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FilterPanel } from './filter-panel';

describe('FilterPanel', () => {
  let component: FilterPanel;
  let fixture: ComponentFixture<FilterPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanel]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    expect(component.isExpanded()).toBe(false);
    component.toggleExpanded();
    expect(component.isExpanded()).toBe(true);
    component.toggleExpanded();
    expect(component.isExpanded()).toBe(false);
  });

  it('should emit search event', () => {
    const searchSpy = vi.spyOn(component.search, 'emit');
    component.onSearch();
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should emit clear event', () => {
    const clearSpy = vi.spyOn(component.clear, 'emit');
    component.onClear();
    expect(clearSpy).toHaveBeenCalled();
  });
});
