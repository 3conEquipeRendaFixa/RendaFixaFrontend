import { Directive, input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[gridCellDef]',
  standalone: true,
})
export class GridCellDef {
  readonly columnKey = input.required<string>({ alias: 'gridCellDef' });
  readonly template = inject(TemplateRef);
}
