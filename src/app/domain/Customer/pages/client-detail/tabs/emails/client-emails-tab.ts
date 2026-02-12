import { Component, input } from '@angular/core';
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
  readonly emails = input<EmailRecord[]>([]);
}
