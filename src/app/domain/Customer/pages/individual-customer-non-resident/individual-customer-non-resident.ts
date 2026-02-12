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

export interface InvestidorNaoResidenteData {
  cpfInvestidor: string;
  contaPrivateBank: string;
  tipoTitularidade: string;
  possuiNif: string;
  nif: string;
  dataComunicadoSaida: string;
  qualificacaoIcvm: string;
  jurisdicao: string;
  periodoResidenteExteriorDe: string;
  periodoResidenteExteriorAte: string;
  tipoPessoaRepresentante: 'fisica' | 'juridica';
  cpfRepresentante: string;
  nomeRepresentante: string;
}

@Component({
  selector: 'app-pf-nao-residente',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './individual-customer-non-resident.html',
  styleUrl: './individual-customer-non-resident.scss',
})
export class PessoaFisicaNaoResidente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal<string>('');

  readonly formData = signal<InvestidorNaoResidenteData>({
    cpfInvestidor: '',
    contaPrivateBank: '',
    tipoTitularidade: '',
    possuiNif: '',
    nif: '',
    dataComunicadoSaida: '',
    qualificacaoIcvm: '',
    jurisdicao: '',
    periodoResidenteExteriorDe: '',
    periodoResidenteExteriorAte: '',
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
    { label: 'Pessoa Física', key: 'pessoa-fisica' },
    { label: 'Contas', key: 'contas' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente', active: true },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp' },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
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
          
          // Map individualCustomerAbroad data to form
          const abroadData = customerData.individualCustomerAbroad;
          console.log('Abroad data:', abroadData);
          this.formData.set({
            cpfInvestidor: abroadData?.indCustAbroadDocmValue || '',
            contaPrivateBank: customerData.customer?.custDepOwnAccNumber || '',
            tipoTitularidade: abroadData?.indCustAbroadAccOwnershipType || '',
            possuiNif: abroadData?.indCustAbroadTaxpayerIdInd || '',
            nif: abroadData?.indCustAbroadTaxpayerNumber || '',
            dataComunicadoSaida: abroadData?.indCustAbroadDepartureNoticeDate 
              ? this.formatDate(abroadData.indCustAbroadDepartureNoticeDate) 
              : '',
            qualificacaoIcvm: abroadData?.indCustAbroadICV560Qualification || '',
            jurisdicao: abroadData?.indCustAbroadInternationalJurisdictionCode || '',
            periodoResidenteExteriorDe: abroadData?.indCustAbroadInitialDateAbroad 
              ? this.formatDate(abroadData.indCustAbroadInitialDateAbroad) 
              : '',
            periodoResidenteExteriorAte: abroadData?.indCustAbroadFinalDateAbroad 
              ? this.formatDate(abroadData.indCustAbroadFinalDateAbroad) 
              : '',
            tipoPessoaRepresentante: abroadData?.indCustAbroadLegalRepresentTypePsonCode === 'PF' 
              ? 'fisica' 
              : 'juridica',
            cpfRepresentante: abroadData?.indCustAbroadLegalRepresentDocmValue || '',
            nomeRepresentante: abroadData?.indCustAbroadLegalRepresentName || '',
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
      'pessoa-fisica': 'pessoa-fisica',
      'contas': 'contas',
      'investidor-nao-residente': 'pessoa-fisica-nao-residente',
      'pessoa-fisica-sfp': 'pessoa-fisica-spp',
      'documentos': 'documentos',
      'enderecos': 'enderecos',
    };

    const route = routeMap[tab.key];
    if (route) {
      this.router.navigate(['/customer', route, this.codigo]);
    }
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