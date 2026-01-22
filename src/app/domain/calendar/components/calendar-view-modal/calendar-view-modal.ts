import { Component, input, output, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarItem, CalendarHoliday } from '@shared/interfaces/calendar.interface';
import { ButtonPrimary } from 'widget/components/buttons/button-primary/button-primary';
import { ButtonClose } from 'widget/components/buttons/button-close/button-close';
import { ButtonIcon } from 'widget/components/buttons/button-icon/button-icon';

@Component({
  selector: 'srf-b3-calendar-view-modal',
  standalone: true,
  imports: [FormsModule, ButtonPrimary, ButtonClose, ButtonIcon],
  templateUrl: './calendar-view-modal.html',
  styleUrl: './calendar-view-modal.scss',
})
export class CalendarViewModal {
  readonly isOpen = input<boolean>(false);
  readonly calendarItem = input<CalendarItem | null>(null);

  readonly closeModal = output<void>();

  selectedYear = new Date().getFullYear();

  readonly holidays = computed<CalendarHoliday[]>(() => {
    return [
      { data: '01/01/2026', descricao: 'Confraternização Universal (Ano Novo)' },
      { data: '03/04/2026', descricao: 'Paixão de Cristo (Sexta-Feira Santa)' },
      { data: '21/04/2026', descricao: 'Tiradentes' },
      { data: '01/05/2026', descricao: 'Dia do Trabalho' },
      { data: '07/09/2026', descricao: 'Independência do Brasil' },
      { data: '12/10/2026', descricao: 'Nossa Senhora Aparecida' },
      { data: '02/11/2026', descricao: 'Finados' },
      { data: '15/11/2026', descricao: 'Proclamação da República' },
      { data: '20/11/2026', descricao: 'Dia Nacional de Zumbi e da Consciência Negra' },
      { data: '25/12/2026', descricao: 'Natal' },
    ];
  });

  onClose(): void {
    this.closeModal.emit();
  }

  onExport(): void {
    console.log('Exportar calendário');
  }
}
