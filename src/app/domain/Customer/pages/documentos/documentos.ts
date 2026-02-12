import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { CustomerService } from '@domain/Customer/services/customer.service';
import { ICustomerInformationApiResponse } from '@domain/Customer/interfaces/ICustomerData';

export interface ClientTab {
  label: string;
  key: string;
  active?: boolean;
  dark?: boolean;
}

export interface DocumentoData {
  docDocmValue: string;
  docDocmTypeName: string;
  docIssuingAgencyAcrn: string;
  docStateAcrn: string;
  docCountryName: string;
  docMainDocm: string;
  docDomainBvmfInd: string;
}

@Component({
  selector: 'app-documentos',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './documentos.html',
  styleUrl: './documentos.scss',
})
export class Documentos implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly tipoPessoa = signal<'PF' | 'PJ'>('PF');

  codigo: string | null = null;
  isLoading = true;

  readonly documentos = signal<DocumentoData[]>([]);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
  ];

  get tabs(): ClientTab[] {
    const isPF = this.tipoPessoa() === 'PF';
    return [
      { label: 'Dados Básicos', key: 'dados-basicos' },
      { label: 'FATCA IRS', key: 'fatca-irs' },
      { label: isPF ? 'Pessoa Física' : 'Pessoa Jurídica', key: 'pessoa' },
      { label: 'Contas', key: 'contas' },
      { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
      { label: isPF ? 'Pessoa Física SFP' : 'Pessoa Jurídica SFP', key: 'pessoa-sfp' },
      { label: 'Documentos', key: 'documentos', active: true },
      { label: 'Endereços', key: 'enderecos' },
      { label: 'Telefones', key: 'telefones' },
      { label: 'E-mails', key: 'emails' },
      { label: 'Relacionamentos', key: 'relacionamentos' },
    ];
  }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if (this.codigo) {
      this.service.loadCustomerInformation(this.codigo).subscribe({
        next: (data: ICustomerInformationApiResponse) => {
          console.log('Customer information loaded:', data);

          // Cliente
          this.clientName.set(data.customer?.custCustName || 'Cliente');
          this.clientStatus.set(
            data.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
          );

          // Tipo de Pessoa (PF ou PJ)
          this.tipoPessoa.set(
            data.customer?.custTypePsonCode === 'PF' ? 'PF' : 'PJ'
          );

          // Breadcrumb
          this.breadcrumbItems[2].label = this.clientName().toUpperCase();

          // Documentos
          this.documentos.set(
            data.document?.map((doc) => ({
              docDocmValue: doc.docDocmValue || '',
              docDocmTypeName: doc.docDocmTypeName || '',
              docIssuingAgencyAcrn: doc.docIssuingAgencyAcrn || '',
              docStateAcrn: doc.docStateAcrn || '',
              docCountryName: doc.docCountryName || '',
              docMainDocm: doc.docMainDocm || '',
              docDomainBvmfInd: doc.docDomainBvmfInd || '',
            })) || []
          );

          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('Error loading customer information:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    if (!this.codigo) return;

    const routes: Record<string, string> = {
      'contas': `/customer/contas/${this.codigo}`,
      'pessoa-fisica-sfp': `/customer/pessoa-fisica-spp/${this.codigo}`,
      'investidor-nao-residente': `/customer/pessoa-fisica-nao-residente/${this.codigo}`,
    };

    if (routes[tab.key]) {
      this.router.navigate([routes[tab.key]]);
    }
  }

  isChecked(value: string): boolean {
    return value === 'S';
  }
}