import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusBadgeVariant = 'success' | 'danger' | 'warning' | 'info';

const STATUS_VARIANT_MAP: Record<string, StatusBadgeVariant> = {
  'ativo': 'success',
  'inativo': 'danger',
  'bloqueado': 'danger',
  'pendente': 'warning',
  'cancelado': 'danger',
};

@Component({
  selector: 'srf-b3-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  readonly status = input<string>('');
  readonly variant = input<StatusBadgeVariant | null>(null);

  readonly resolvedVariant = computed<StatusBadgeVariant>(() => {
    if (this.variant()) return this.variant()!;
    const key = this.status().toLowerCase().trim();
    return STATUS_VARIANT_MAP[key] || 'info';
  });
}
