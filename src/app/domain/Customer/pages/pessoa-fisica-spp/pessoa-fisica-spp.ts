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

export interface PessoaFisicaSfpData {
  moeda: string;
  valorRendaAtual: string;
  valorSituacaoPatrimonial: string;
  valorCapacidadeFinanceira: string;
  dataRendaAnual: string;
  dataCapacidadeFinanceira: string;
  dataSituacaoPatrimonial: string;
}

@Component({
  selector: 'app-pf-spp',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-fisica-spp.html',
  styleUrl: './pessoa-fisica-spp.scss',
})
export class PessoaFisicaSPP implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal<string>('');

  codigo: string | null = null;
  isLoading = true;

  private readonly service = inject(CustomerService);
  

  readonly formData = signal<PessoaFisicaSfpData>({
    moeda: '',
    valorRendaAtual: '',
    valorSituacaoPatrimonial: '',
    valorCapacidadeFinanceira: '',
    dataRendaAnual: '',
    dataCapacidadeFinanceira: '',
    dataSituacaoPatrimonial: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES' },
    { label: 'MARIA SILVA', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Física', key: 'pessoa-fisica' },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp', active: true },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Contas', key: 'contas' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
  ];

  ngOnInit(): void {
  this.codigo = this.route.snapshot.paramMap.get('codigo');

  if (this.codigo) {
    this.service.loadCustomerInformation(this.codigo).subscribe({
      next: (data: unknown) => {
        const customerData = data as ICustomerInformationApiResponse;
        console.log('Customer information loaded:', customerData);

          this.clientName.set(customerData.customer?.custCustName || '');
          this.clientStatus.set(
            customerData.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
          );
        const pfSfpData = customerData.individualCustFinan;

        this.formData.set({
          moeda: pfSfpData?.indCustFinCurrencyCode.toString() || '',
          valorRendaAtual: pfSfpData?.indCustFinAnnualIncomeValue?.toString() || '',
          valorSituacaoPatrimonial: pfSfpData?.indCustFinFinancialValue?.toString() || '',
          valorCapacidadeFinanceira: pfSfpData?.indCustFinCapacityValue?.toString() || '',
          dataRendaAnual: pfSfpData?.indCustFinAnnualIncomeDate
            ? this.formatDate(pfSfpData.indCustFinAnnualIncomeDate)
            : '',
          dataCapacidadeFinanceira: pfSfpData?.indCustFinCapacityDate
            ? this.formatDate(pfSfpData.indCustFinCapacityDate)
            : '',
          dataSituacaoPatrimonial: pfSfpData?.indCustFinFinancialDate
            ? this.formatDate(pfSfpData.indCustFinFinancialDate)
            : '',
        });

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
    this.router.navigate(['/asset-registration/private-bound', this.codigo]);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.key === 'investidor-nao-residente' && this.codigo) {
      this.router.navigate(['/asset-registration/private-bound', this.codigo, 'pessoa-fisica-nao-residente']);
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
