import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';
import { CustomerDetailsService } from '../../services';

export interface ClientTab {
  label: string;
  key: string;
  active?: boolean;
}

export interface NonResidentInvestorData {
  investorCpf: string;
  privateBankAccount: string;
  accountOwnershipType: string;
  hasTaxpayerId: string;
  taxpayerNumber: string;
  departureNoticeDate: string;
  icvmQualification: string;
  jurisdiction: string;
  abroadPeriodFrom: string;
  abroadPeriodTo: string;
  legalRepresentPersonType: 'individual' | 'corporate';
  legalRepresentCpf: string;
  legalRepresentName: string;
}

@Component({
  selector: 'app-pf-nao-residente',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-fisica-nao-residente.html',
  styleUrl: './pessoa-fisica-nao-residente.scss',
})
export class PessoaFisicaNaoResidente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerDetailsService = inject(CustomerDetailsService);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal<string>('Equities  |  Derivativos');

  readonly formData = signal<NonResidentInvestorData>({
    investorCpf: '',
    privateBankAccount: '',
    accountOwnershipType: '',
    hasTaxpayerId: '',
    taxpayerNumber: '',
    departureNoticeDate: '',
    icvmQualification: '',
    jurisdiction: '',
    abroadPeriodFrom: '',
    abroadPeriodTo: '',
    legalRepresentPersonType: 'individual',
    legalRepresentCpf: '',
    legalRepresentName: '',
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

  private readonly tabRouteMap: Record<string, string> = {
    'dados-basicos': 'dados-basicos',
    'fatca-irs': 'fatca-irs',
    'pessoa-fisica': 'pessoa-fisica',
    'investidor-nao-residente': 'pessoa-fisica-nao-residente',
    'pessoa-fisica-sfp': 'pessoa-fisica-spp',
  };

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.loadCustomerData();
  }

  private loadCustomerData(): void {
    const custCode = Number(this.codigo);
    if (!custCode) {
      this.isLoading = false;
      return;
    }

    this.customerDetailsService.getCustomerInformation(custCode).subscribe({
      next: (data) => {
        const customer = data.customer;
        const abroadData = data.individualCustomerAbroad;

        this.clientName.set(customer.custCustName);
        this.clientStatus.set(customer.custStatRegCode === 1 ? 'ativo' : 'inativo');

        this.breadcrumbItems = [
          { label: 'PÁGINA INICIAL', route: '/' },
          { label: 'CADASTRO DE CLIENTES', route: '/customer' },
          { label: customer.custCustName.toUpperCase(), current: true },
        ];

        this.formData.set({
          investorCpf: abroadData?.indCustAbroadDocmValue || '',
          privateBankAccount: customer.custDepOwnAccNumber || '',
          accountOwnershipType: abroadData?.indCustAbroadAccOwnershipType || '',
          hasTaxpayerId: abroadData?.indCustAbroadTaxpayerIdInd || '',
          taxpayerNumber: abroadData?.indCustAbroadTaxpayerNumber || '',
          departureNoticeDate: abroadData?.indCustAbroadDepartureNoticeDate
            ? this.formatDate(abroadData.indCustAbroadDepartureNoticeDate)
            : '',
          icvmQualification: abroadData?.indCustAbroadICV560Qualification || '',
          jurisdiction: abroadData?.indCustAbroadInternationalJurisdictionCode || '',
          abroadPeriodFrom: abroadData?.indCustAbroadInitialDateAbroad
            ? this.formatDate(abroadData.indCustAbroadInitialDateAbroad)
            : '',
          abroadPeriodTo: abroadData?.indCustAbroadFinalDateAbroad
            ? this.formatDate(abroadData.indCustAbroadFinalDateAbroad)
            : '',
          legalRepresentPersonType: abroadData?.indCustAbroadLegalRepresentTypePsonCode === 'PF'
            ? 'individual'
            : 'corporate',
          legalRepresentCpf: abroadData?.indCustAbroadLegalRepresentDocmValue || '',
          legalRepresentName: abroadData?.indCustAbroadLegalRepresentName || '',
        });

        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error('Error loading customer information:', err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.active) return;
    const route = this.tabRouteMap[tab.key];
    if (route && this.codigo) {
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
