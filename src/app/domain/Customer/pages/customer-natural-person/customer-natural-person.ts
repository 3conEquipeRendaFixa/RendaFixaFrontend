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

export interface NaturalPersonData {
  nationality: string;
  birthStateUf: string;
  birthCity: string;
  residenceCountry: string;
  gender: string;
  education: string;
  politicallyExposed: string;
  linkedPerson: boolean;
  fatherName: string;
  motherName: string;
  documentType: string;
  documentNumber: string;
  issuingAgency: string;
  issuingCountry: string;
  issuingState: string;
}

@Component({
  selector: 'app-customer-natural-person',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './customer-natural-person.html',
  styleUrl: './customer-natural-person.scss',
})
export class CustomerNaturalPerson implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerDetailsService = inject(CustomerDetailsService);

  codigo: string | null = null;

  readonly clientName = signal('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

  readonly formData = signal<NaturalPersonData>({
    nationality: '',
    birthStateUf: '',
    birthCity: '',
    residenceCountry: '',
    gender: '',
    education: '',
    politicallyExposed: '',
    linkedPerson: false,
    fatherName: '',
    motherName: '',
    documentType: '',
    documentNumber: '',
    issuingAgency: '',
    issuingCountry: '',
    issuingState: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: '', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Física', key: 'pessoa-fisica', active: true },
    { label: 'Contas', key: 'contas' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
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
    if (!custCode) return;

    this.customerDetailsService.getCustomerInformation(custCode).subscribe(data => {
      const customer = data.customer;
      const individual = data.individualCustomer;
      const mainDoc = data.document?.find(d => d.docCustMainDocm === 'S');

      this.clientName.set(customer.custCustName);
      this.clientStatus.set(customer.custStatRegCode === 1 ? 'ativo' : 'inativo');

      this.breadcrumbItems = [
        { label: 'PÁGINA INICIAL', route: '/' },
        { label: 'CADASTRO DE CLIENTES', route: '/customer' },
        { label: customer.custCustName.toUpperCase(), current: true },
      ];

      this.formData.set({
        nationality: individual?.indCustCountryName || '',
        birthStateUf: individual?.indCustStateName || '',
        birthCity: individual?.indCustNameCityBirth || '',
        residenceCountry: individual?.indCustCountryResName || '',
        gender: individual?.indCustGenderDscn || '',
        education: individual?.indCustEducationDscn || '',
        politicallyExposed: individual?.indCustPepInd === 'S' ? 'Sim' : 'Não',
        linkedPerson: customer.custPsonLinkInd === 'S',
        fatherName: individual?.indCustFatherName || '',
        motherName: individual?.indCustMotherName || '',
        documentType: mainDoc?.docDocmTypeName || '',
        documentNumber: mainDoc?.docDocmValue || '',
        issuingAgency: mainDoc?.docIssuingAgencyAcrn || '',
        issuingCountry: mainDoc?.docCountryName || '',
        issuingState: mainDoc?.docStateName || '',
      });
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

  onLinkedPersonChange(checked: boolean): void {
    this.formData.update(data => ({ ...data, linkedPerson: checked }));
  }
}
