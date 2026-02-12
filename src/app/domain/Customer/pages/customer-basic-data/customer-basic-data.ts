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

export interface BasicDataForm {
  typePsonCode: 'PF' | 'PJ';
  investorType: string;
  mainDocument: string;
  cvmCode: string;
  investorStatus: string;
  taxNature: string;
  fullName: string;
  shortName: string;
  birthDate: string;
  otcProfile: boolean;
  listedProfile: boolean;
}

const STATUS_MAP: Record<number, string> = {
  1: 'Ativo',
  2: 'Inativo',
  3: 'Bloqueado',
};

@Component({
  selector: 'app-customer-basics-datas',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './customer-basic-data.html',
  styleUrl: './customer-basic-data.scss',
})
export class CustomerBasicsDatas implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerDetailsService = inject(CustomerDetailsService);

  codigo: string | null = null;

  readonly clientName = signal('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');
  readonly tipoPessoa = signal<'PF' | 'PJ'>('PF');

  readonly formData = signal<BasicDataForm>({
    typePsonCode: 'PF',
    investorType: '',
    mainDocument: '',
    cvmCode: '',
    investorStatus: '',
    taxNature: '',
    fullName: '',
    shortName: '',
    birthDate: '',
    otcProfile: false,
    listedProfile: false,
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
  ];

  get tabs(): ClientTab[] {
    const isPF = this.tipoPessoa() === 'PF';
    return [
      { label: 'Dados Básicos', key: 'dados-basicos', active: true },
      { label: 'FATCA IRS', key: 'fatca-irs' },
      { label: isPF ? 'Pessoa Física' : 'Pessoa Jurídica', key: isPF ? 'pessoa-fisica' : 'pessoa-juridica' },
      { label: 'Contas', key: 'contas' },
      { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
      { label: isPF ? 'Pessoa Física SFP' : 'Pessoa Jurídica SFP', key: isPF ? 'pessoa-fisica-sfp' : 'pessoa-juridica-sfp' },
      { label: 'Documentos', key: 'documentos' },
      { label: 'Endereços', key: 'enderecos' },
      { label: 'Telefones', key: 'telefones' },
      { label: 'E-mails', key: 'emails' },
      { label: 'Relacionamentos', key: 'relacionamentos' },
    ];
  }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.loadCustomerData();
  }

  private loadCustomerData(): void {
    const custCode = Number(this.codigo);
    if (!custCode) return;

    this.customerDetailsService.getCustomerInformation(custCode).subscribe(data => {
      const customer = data.customer;
      const individual = data.individualCustomer;
      const mainDoc = data.document?.find(d => d.docCustMainDocm === 'S');
      console.log(data);
      this.clientName.set(customer.custCustName);
      this.clientStatus.set(customer.custStatRegCode === 1 ? 'ativo' : 'inativo');
      this.tipoPessoa.set(customer.custTypePsonCode as 'PF' | 'PJ');

      this.breadcrumbItems = [
        { label: 'PÁGINA INICIAL', route: '/' },
        { label: 'CADASTRO DE CLIENTES', route: '/customer' },
        { label: customer.custCustName.toUpperCase(), current: true },
      ];

      const birthDate = individual?.indCustBirthDate
        ? this.formatDate(individual.indCustBirthDate)
        : '';

      this.formData.set({
        typePsonCode: customer.custTypePsonCode as 'PF' | 'PJ',
        investorType: customer.custResnAbroadInd === 'N' ? 'Residente' : 'Não Residente',
        mainDocument: mainDoc?.docDocmValue || '',
        cvmCode: '',
        investorStatus: STATUS_MAP[customer.custStatRegCode] || '',
        taxNature: customer.custTaxNature || '',
        fullName: customer.custCustName,
        shortName: customer.custSummrCustName,
        birthDate: birthDate,
        otcProfile: customer.custTradingProfile?.includes('B') || false,
        listedProfile: customer.custTradingProfile?.includes('L') || false,
      });
    });
  }

  private formatDate(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

    const isPF = this.tipoPessoa() === 'PF';
    const routeMap: Record<string, string> = {
      'dados-basicos': 'dados-basicos',
      'fatca-irs': 'fatca-irs',
      'pessoa-fisica': 'pessoa-fisica',
      'pessoa-juridica': 'pessoa-juridica',
      'contas': 'contas',
      'investidor-nao-residente': isPF ? 'pessoa-fisica-nao-residente' : 'pessoa-juridica-nao-residente',
      'pessoa-fisica-sfp': 'pessoa-fisica-sfp',
      'pessoa-juridica-sfp': 'pessoa-juridica-sfp',
      'documentos': 'documentos',
      'enderecos': 'enderecos',
    };

    const route = routeMap[tab.key];
    if (route) {
      this.router.navigate(['/customer', route, this.codigo]);
    }
  }

  onTypePsonCodeChange(tipo: 'PF' | 'PJ'): void {
    this.formData.update(data => ({ ...data, typePsonCode: tipo }));
  }

  onProfileChange(field: 'otcProfile' | 'listedProfile', checked: boolean): void {
    this.formData.update(data => ({ ...data, [field]: checked }));
  }
}
