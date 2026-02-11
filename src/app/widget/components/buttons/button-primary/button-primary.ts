import { Component, output, input } from '@angular/core';

@Component({
  selector: 'srf-b3-button-primary',
  standalone: true,
  template: `
    <button type="button" class="btn-primary" [disabled]="disabled()" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: `
    .btn-primary {
      padding: 0 8px;
      height: 35px;
      cursor: pointer;
      font-family: 'Rubik', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 1em;
      color: #2660F0;
      background: transparent;
      border: 1px solid #CBD3E1;
      border-radius: 0;
      transition: all 0.2s;
      
      &:hover:not(:disabled) {
        background: #2660F0;
        color: #FFFFFF;
      }
      
      &:disabled {
        color: #AFAFAF;
        background: #EFEFEF;
        border-color: #CBD3E1;
        cursor: not-allowed;
        opacity: 1;
      }
    }
  `
})
export class ButtonPrimary {
  readonly clicked = output<void>();
  readonly disabled = input<boolean>(false);
}
