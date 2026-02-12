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

export interface FatcaIrsData {
  usPerson: string;
  fatcaIrsProfile: string;
  crsProfile: string;
  giin: string;
  leiCode: string;
  relatedCountry: string;
}

@Component({
  selector: 'app-customer-fatca',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './customer-fatca.html',
  styleUrl: './customer-fatca.scss',
})
export class CustomerFatca implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerDetailsService = inject(CustomerDetailsService);

  codigo: string | null = null;

  readonly clientName = signal('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');
  readonly tipoPessoa = signal<'PF' | 'PJ'>('PF');

  readonly formData = signal<FatcaIrsData>({
    usPerson: '',
    fatcaIrsProfile: '',
    crsProfile: '',
    giin: '',
    leiCode: '',
    relatedCountry: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
  ];

  get tabs(): ClientTab[] {
    const isPF = this.tipoPessoa() === 'PF';
    return [
      { label: 'Dados Básicos', key: 'dados-basicos' },
      { label: 'FATCA IRS', key: 'fatca-irs', active: true },
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
      console.log(data);
      this.clientName.set(customer.custCustName);
      this.clientStatus.set(customer.custStatRegCode === 1 ? 'ativo' : 'inativo');
      this.tipoPessoa.set(customer.custTypePsonCode as 'PF' | 'PJ');

      this.breadcrumbItems = [
        { label: 'PÁGINA INICIAL', route: '/' },
        { label: 'CADASTRO DE CLIENTES', route: '/customer' },
        { label: customer.custCustName.toUpperCase(), current: true },
      ];

      this.formData.set({
        usPerson: customer.custFatcaUsPersonInd === 'S' ? 'Sim' : 'Não',
        fatcaIrsProfile: customer.custFatcaIrsProfileCode || '',
        crsProfile: customer.custFatcaCrsProfileCode || '',
        giin: customer.custFatcaGiinCode || '',
        leiCode: customer.custFatcaLeiCode || '',
        relatedCountry: customer.custFatcaRelatedCountryName
          ? `${customer.custFatcaRelatedCountry} - ${customer.custFatcaRelatedCountryName}`
          : customer.custFatcaRelatedCountry || '',
      });
    });
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
      'pessoa-fisica-sfp': 'pessoa-fisica-spp',
      'pessoa-juridica-sfp': 'pessoa-juridica-sfp',
      'documentos': 'documentos',
      'enderecos': 'enderecos',
    };

    const route = routeMap[tab.key];
    if (route) {
      this.router.navigate(['/customer', route, this.codigo]);
    }
  }
}
