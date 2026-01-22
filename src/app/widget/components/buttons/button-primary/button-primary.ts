import { Component, output } from '@angular/core';

@Component({
  selector: 'srf-b3-button-primary',
  standalone: true,
  template: `
    <button type="button" class="btn-primary" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: `
    .btn-primary {
      padding: 8px 16px;
      cursor: pointer;
    }
  `
})
export class ButtonPrimary {
  readonly clicked = output<void>();
}
