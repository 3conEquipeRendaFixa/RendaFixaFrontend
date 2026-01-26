import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have modules in row 1', () => {
    expect(component.modulesRow1.length).toBeGreaterThan(0);
  });

  it('should have modules in row 2', () => {
    expect(component.modulesRow2.length).toBeGreaterThan(0);
  });

  it('should toggle dropdown', () => {
    const event = new Event('click');
    component.toggleDropdown(0, event);
    expect(component.activeDropdown()).toBe(0);

    component.toggleDropdown(0, event);
    expect(component.activeDropdown()).toBeNull();
  });

  it('should highlight modules on relatorios click', () => {
    const event = new Event('click');
    component.onRelatoriosClick(event);
    expect(component.highlightedModules().length).toBe(3);
  });

  it('should check if module is highlighted', () => {
    component.highlightedModules.set(['cadastro-clientes']);
    expect(component.isHighlighted('cadastro-clientes')).toBeTruthy();
    expect(component.isHighlighted('tributos')).toBeFalsy();
  });
});
