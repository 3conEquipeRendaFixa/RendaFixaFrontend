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

export interface EnderecoData {
  addAddressPurposeName: string;
  addAddressTypeName: string;
  addStreetName: string;
  addStreetNumber: string;
  addAdditionalAddressText: string;
  addNeighborhoodName: string;
  addZipCodeNumber: number | null;
  addZipCodeExtension: number | null;
  addCountryName: string;
  addStateAcrn: string;
  addMunicipalityName: string;
  addOfficialAddressInd: string;
  addResponsiblePson: string;
  addSendBvmfInd: string;
}

@Component({
  selector: 'app-enderecos',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './addresses.html',
  styleUrl: './addresses.scss',
})
export class Enderecos implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal('Equities  |  Derivativos');
  readonly tipoPessoa = signal<'PF' | 'PJ'>('PF');

  codigo: string | null = null;
  isLoading = true;

  readonly enderecos = signal<EnderecoData[]>([]);

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
      { label: isPF ? 'Pessoa Física' : 'Pessoa Jurídica', key: isPF ? 'pessoa-fisica' : 'pessoa-juridica' },
      { label: 'Contas', key: 'contas' },
      { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
      { label: isPF ? 'Pessoa Física SFP' : 'Pessoa Jurídica SFP', key: isPF ? 'pessoa-fisica-sfp' : 'pessoa-juridica-sfp' },
      { label: 'Documentos', key: 'documentos' },
      { label: 'Endereços', key: 'enderecos', active: true },
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
          this.clientName.set(data.customer?.custCustName || '');
          this.clientStatus.set(
            data.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
          );
          this.tipoPessoa.set(
            data.customer?.custTypePsonCode === 'PF' ? 'PF' : 'PJ'
          );

          this.breadcrumbItems = [
            { label: 'PÁGINA INICIAL', route: '/' },
            { label: 'CADASTRO DE CLIENTES', route: '/customer' },
            { label: (data.customer?.custCustName || '').toUpperCase(), current: true },
          ];

          this.enderecos.set(
            data.address?.map((addr) => ({
              addAddressPurposeName: addr.addAddressPurposeName || '',
              addAddressTypeName: addr.addAddressTypeName || '',
              addStreetName: addr.addStreetName || '',
              addStreetNumber: addr.addStreetNumber || '',
              addAdditionalAddressText: addr.addAdditionalAddressText || '',
              addNeighborhoodName: addr.addNeighborhoodName || '',
              addZipCodeNumber: addr.addZipCodeNumber || null,
              addZipCodeExtension: addr.addZipCodeExtension || null,
              addCountryName: addr.addCountryName || '',
              addStateAcrn: addr.addStateAcrn || '',
              addMunicipalityName: addr.addMunicipalityName || '',
              addOfficialAddressInd: addr.addOfficialAddressInd || '',
              addResponsiblePson: addr.addResponsiblePson || '',
              addSendBvmfInd: addr.addSendBvmfInd || '',
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

  isChecked(value: string): boolean {
    return value === 'S';
  }

  formatCep(part: number | null): string {
    if (!part) return '';
    return part.toString().padStart(5, '0');
  }

  formatCepExtension(part: number | null): string {
    if (!part) return '';
    return part.toString().padStart(4, '0');
  }
}
