import { Component, output } from '@angular/core';

@Component({
  selector: 'srf-b3-button-secondary',
  standalone: true,
  template: `
    <button type="button" class="btn-secondary" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: `
    .btn-secondary {
      padding: 8px 16px;
      cursor: pointer;
    }
  `
})
export class ButtonSecondary {
  readonly clicked = output<void>();
}
