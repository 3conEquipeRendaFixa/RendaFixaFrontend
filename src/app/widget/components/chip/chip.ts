import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'srf-b3-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  readonly label = input<string>('');
  readonly value = input<string>('');
  readonly removable = input<boolean>(true);
  readonly size = input<'sm' | 'md'>('sm');
  readonly remove = output<void>();

  onRemove(event: Event): void {
    event.stopPropagation();
    this.remove.emit();
  }
}
