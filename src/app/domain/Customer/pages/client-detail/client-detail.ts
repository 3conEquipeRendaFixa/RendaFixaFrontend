import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { ClientPhonesTab } from './tabs/phones/client-phones-tab';
import { ClientEmailsTab } from './tabs/emails/client-emails-tab';
import { ClientRelationshipsTab } from './tabs/relationships/client-relationships-tab';

export interface ClientTab {
  label: string;
  key: string;
  active?: boolean;
}

@Component({
  selector: 'app-client-detail',
  imports: [CommonModule, Breadcrumb, ClientPhonesTab, ClientEmailsTab, ClientRelationshipsTab],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss',
})
export class ClientDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal(['Equities', 'Derivativos']);
  readonly activeTab = signal('telefones');

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: 'MARIA SILVA', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Física', key: 'pessoa-fisica' },
    { label: 'Contas', key: 'contas' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp' },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
  ];

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    const tabParam = this.route.snapshot.queryParamMap.get('tab');
    if (tabParam && this.tabs.some(t => t.key === tabParam)) {
      this.activeTab.set(tabParam);
    }
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    this.activeTab.set(tab.key);

    if (tab.key === 'investidor-nao-residente' && this.codigo) {
      this.router.navigate(['/customer/pessoa-fisica-nao-residente', this.codigo]);
      return;
    }
    if (tab.key === 'pessoa-fisica-sfp' && this.codigo) {
      this.router.navigate(['/customer/pessoa-fisica-spp', this.codigo]);
      return;
    }
  }

  isTabActive(tabKey: string): boolean {
    return this.activeTab() === tabKey;
  }
}
