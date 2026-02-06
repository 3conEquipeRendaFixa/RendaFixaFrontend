import { Component, input, output, TemplateRef, ContentChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface GridColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface GridAction {
  icon: string;
  label: string;
  route?: string;
  routeIdKey?: string;         
  onClick?: (item: unknown) => void;
}

@Component({
  selector: 'srf-b3-grid',
  imports: [CommonModule],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid<T extends object = Record<string, unknown>> {
  private router = inject(Router);

  readonly columns = input<GridColumn[]>([]);
  readonly data = input<T[]>([]);
  readonly actions = input<GridAction[]>([]);
  readonly trackByKey = input<string>('id');
  readonly showSortIcon = input<boolean>(true);
  readonly showColumnDividers = input<boolean>(false);
  readonly resultsLabel = input<string>('');

  readonly rowClick = output<T>();
  readonly actionClick = output<{ action: GridAction; item: T }>();
  readonly sortClick = output<{ column: GridColumn; direction: 'asc' | 'desc' }>();

  @ContentChild('actionTemplate') actionTemplate?: TemplateRef<unknown>;

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  onRowClick(item: T): void {
    this.rowClick.emit(item);
  }

  onActionClick(action: GridAction, item: T, event: Event): void {
    event.stopPropagation();
    this.actionClick.emit({ action, item });

    // Se a ação tem rota configurada, navega automaticamente
    if (action.route) {
      const idKey = action.routeIdKey || 'id';
      const itemId = (item as Record<string, unknown>)[idKey];
      if (itemId !== undefined) {
        this.router.navigate([action.route, itemId]);
      } else {
        this.router.navigate([action.route]);
      }
      return;
    }

    if (action.onClick) {
      action.onClick(item);
    }
  }

  onSortClick(column: GridColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortClick.emit({ column, direction: this.sortDirection });
  }

  getCellValue(item: T, key: string): unknown {
    return (item as Record<string, unknown>)[key];
  }

  getTrackId(index: number, item: T): unknown {
    return (item as Record<string, unknown>)[this.trackByKey()] ?? index;
  }
}
