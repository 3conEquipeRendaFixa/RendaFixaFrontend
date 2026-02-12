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
}

export interface PjInvestidorNaoResidenteData {
  cnpjInvestidorNr: string;
  paisRegistro: string;
  jurisdicao: string;
  qualificacaoIcvm: string;
  tipoTitularidade: string;
  nif: string;
  contaPrivateBank: string;
  periodoResidenteExterior: string;
  dataInclusao: string;
  dataExclusao: string;
  tipoPessoaRepresentante: 'fisica' | 'juridica';
  cpfRepresentante: string;
  nomeRepresentante: string;
}

@Component({
  selector: 'app-pj-nao-residente',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './legal-customer-non-resident.html',
  styleUrl: './legal-customer-non-resident.scss',
})
export class PessoaJuridicaNaoResidente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal<string>('');

  readonly formData = signal<PjInvestidorNaoResidenteData>({
    cnpjInvestidorNr: '',
    paisRegistro: '',
    jurisdicao: '',
    qualificacaoIcvm: '',
    tipoTitularidade: '',
    nif: '',
    contaPrivateBank: '',
    periodoResidenteExterior: '',
    dataInclusao: '',
    dataExclusao: '',
    tipoPessoaRepresentante: 'fisica',
    cpfRepresentante: '',
    nomeRepresentante: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Jurídica', key: 'pessoa-juridica' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente', active: true },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Contas', key: 'contas' },
    { label: 'Pessoa Jurídica SFP', key: 'pessoa-juridica-sfp' },
  ];

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    
    if (this.codigo) {
      this.service.loadCustomerInformation(this.codigo).subscribe({
        next: (data: unknown) => {
          const customerData = data as ICustomerInformationApiResponse;
          console.log('Customer information loaded:', customerData);
          
          // Set client header info
          this.clientName.set(customerData.customer?.custCustName || '');
          this.clientStatus.set(
            customerData.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
          );

          this.breadcrumbItems = [
            { label: 'PÁGINA INICIAL', route: '/' },
            { label: 'CADASTRO DE CLIENTES', route: '/customer' },
            { label: (customerData.customer?.custCustName || '').toUpperCase(), current: true },
          ];
          
          // Map legalEntityAbroad data to form
          const abroadData = customerData.legalEntityAbroad;
          
          this.formData.set({
            cnpjInvestidorNr: customerData.customer?.custDepOwnAccNumber || 'tentando setar',
            paisRegistro: abroadData?.legEntAbroadInternationalJurisdictionName || 'tentando setar',
            jurisdicao: abroadData?.legEntAbroadInternationalJurisdictionCode || 'tentando setar',
            qualificacaoIcvm: '', // Não há campo correspondente no JSON para PJ
            tipoTitularidade: abroadData?.legEntAbroadAccOwnershipType || '',
            nif: abroadData?.legEntAbroadTaxpayerIdNumber || '',
            contaPrivateBank: customerData.customer?.custDepOwnAccNumber || '',
            periodoResidenteExterior: '',
            dataInclusao: '',
            dataExclusao: '',
            tipoPessoaRepresentante: 'juridica',
            cpfRepresentante: '',
            nomeRepresentante: '',
          });
          
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('Error loading customer information:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.active || !this.codigo) return;

    const detailTabs = ['telefones', 'emails', 'relacionamentos'];
    if (detailTabs.includes(tab.key)) {
      this.router.navigate(['/customer/detail', this.codigo], { queryParams: { tab: tab.key } });
      return;
    }

    const routeMap: Record<string, string> = {
      'dados-basicos': 'dados-basicos',
      'fatca-irs': 'fatca-irs',
      'pessoa-juridica': 'pessoa-juridica',
      'contas': 'contas',
      'investidor-nao-residente': 'pessoa-juridica-nao-residente',
      'pessoa-juridica-sfp': 'pessoa-juridica-sfp',
      'documentos': 'documentos',
      'enderecos': 'enderecos',
    };

    const route = routeMap[tab.key];
    if (route) {
      this.router.navigate(['/customer', route, this.codigo]);
    }
  }

  onTipoPessoaChange(tipo: 'fisica' | 'juridica'): void {
    this.formData.update(data => ({ ...data, tipoPessoaRepresentante: tipo }));
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}