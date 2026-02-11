import { Component, output } from '@angular/core';

@Component({
  selector: 'srf-b3-button-icon',
  standalone: true,
  template: `
    <button type="button" class="btn-icon" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: `
    .btn-icon {
      padding: 8px;
      cursor: pointer;
    }
  `
})
export class ButtonIcon {
  readonly clicked = output<void>();
}
