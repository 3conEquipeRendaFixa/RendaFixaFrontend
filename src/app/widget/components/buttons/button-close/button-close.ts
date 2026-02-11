import { Component, output } from '@angular/core';

@Component({
  selector: 'srf-b3-button-close',
  standalone: true,
  template: `
    <button type="button" class="btn-close" (click)="clicked.emit()">✕</button>
  `,
  styles: `
    .btn-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
  `
})
export class ButtonClose {
  readonly clicked = output<void>();
}
