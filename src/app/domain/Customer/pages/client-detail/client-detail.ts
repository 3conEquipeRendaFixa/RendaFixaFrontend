import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { ClientPhonesTab, PhoneRecord } from './tabs/phones/client-phones-tab';
import { ClientEmailsTab, EmailRecord } from './tabs/emails/client-emails-tab';
import { ClientRelationshipsTab, RelationshipRecord } from './tabs/relationships/client-relationships-tab';
import { CustomerService } from '@domain/Customer/services/customer.service';
import { ICustomerInformationApiResponse } from '@domain/Customer/interfaces/ICustomerData';

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
  private readonly customerService = inject(CustomerService);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal<string[]>([]);
  readonly activeTab = signal('telefones');

  readonly phones = signal<PhoneRecord[]>([]);
  readonly emails = signal<EmailRecord[]>([]);
  readonly relationships = signal<RelationshipRecord[]>([]);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
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

    if (this.codigo) {
      this.loadCustomerData(this.codigo);
    }
  }

  private loadCustomerData(custCode: string): void {
    this.isLoading = true;
    this.customerService.loadCustomerInformation(custCode).subscribe({
      next: (data: ICustomerInformationApiResponse) => {
        // Dados do cliente
        this.clientName.set(data.customer?.custCustName || '');
        this.clientStatus.set(
          data.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
        );
        this.breadcrumbItems = [
          { label: 'PÁGINA INICIAL', route: '/' },
          { label: 'CADASTRO DE CLIENTES', route: '/customer' },
          { label: (data.customer?.custCustName || '').toUpperCase(), current: true },
        ];

        // Telefones
        this.phones.set(
          (data.phone || []).map(p => ({
            ddi: p.phoneDdiCode ? `+${p.phoneDdiCode}` : '',
            ddd: p.phoneDddCode?.toString() || '',
            numero: p.phoneNumber || '',
            ramal: p.phoneExtensionPhoneNumber?.toString() || '',
            tipoTelefone: p.phoneDeviceTypeName || '',
            finalidade: p.phonePurposeDscn || '',
          }))
        );

        // E-mails
        this.emails.set(
          (data.email || []).map(e => ({
            email: e.emailAddress || '',
            finalidade: e.emailPurposeName || '',
          }))
        );

        // Relacionamentos
        this.relationships.set(
          (data.personRelationshipCus || []).map(r => ({
            tipoRelacionamento: r.relatCusRelationshipTypeName || '',
            cpfPessoa: r.relatCusDocumentCode || '',
            nomePessoa: '',
            inicioRelacionamento: r.relatCusBeginDate ? this.formatDate(r.relatCusBeginDate) : '',
            fimRelacionamento: r.relatCusEndDate ? this.formatDate(r.relatCusEndDate) : '',
            cadastrarB3: r.relatCusSendBvmfInd === 'S',
          }))
        );

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do cliente:', err);
        this.isLoading = false;
      },
    });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
