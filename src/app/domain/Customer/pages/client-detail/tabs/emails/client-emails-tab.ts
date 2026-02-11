import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EmailRecord {
  email: string;
  finalidade: string;
}

@Component({
  selector: 'app-client-emails-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-emails-tab.html',
  styleUrl: './client-emails-tab.scss',
})
export class ClientEmailsTab {
  readonly emails = signal<EmailRecord[]>([
    {
      email: '',
      finalidade: '',
    },
  ]);

  readonly finalidades = [
    { value: 'Finalidade 1', label: 'Finalidade 1' },
    { value: 'Finalidade 2', label: 'Finalidade 2' },
    { value: 'Finalidade 3', label: 'Finalidade 3' },
  ];
}
