import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PhoneRecord {
  ddi: string;
  ddd: string;
  numero: string;
  ramal: string;
  tipoTelefone: string;
  finalidade: string;
}

@Component({
  selector: 'app-client-phones-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-phones-tab.html',
  styleUrl: './client-phones-tab.scss',
})
export class ClientPhonesTab {
  readonly phones = signal<PhoneRecord[]>([
    {
      ddi: '+55',
      ddd: '11',
      numero: '9 9999-0000',
      ramal: '',
      tipoTelefone: 'Celular',
      finalidade: '',
    },
  ]);

  readonly tiposTelefone = [
    { value: 'Celular', label: 'Celular' },
    { value: 'Residencial', label: 'Residencial' },
    { value: 'Comercial', label: 'Comercial' },
    { value: 'Fax', label: 'Fax' },
  ];

  readonly finalidades = [
    { value: 'Principal', label: 'Principal' },
    { value: 'Secundário', label: 'Secundário' },
    { value: 'Emergência', label: 'Emergência' },
  ];
}
