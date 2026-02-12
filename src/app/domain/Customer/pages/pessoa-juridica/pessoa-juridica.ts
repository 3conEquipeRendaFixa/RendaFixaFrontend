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

export interface PessoaJuridicaData {
  paisRegistro: string;
  atividadeEconomica: string;
  grupoEconomico: string;
  naturezaJuridica: string;
  indicadorCvm286: string;
  autorizaTransmOrdens: string;
  adminCarteirasAdministradas: string;
  adminFundosInvestimento: string;
  classificacaoRiscoComitente: string;
  descricaoClassificacaoRisco: string;
  empresaSemFinsLucrativos: string;
  dataUltimaAtualizacao: string;
}

@Component({
  selector: 'app-pessoa-juridica',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-juridica.html',
  styleUrl: './pessoa-juridica.scss',
})
export class PessoaJuridica implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly clientModules = signal<string>('');

  readonly formData = signal<PessoaJuridicaData>({
    paisRegistro: '',
    atividadeEconomica: '',
    grupoEconomico: '',
    naturezaJuridica: '',
    indicadorCvm286: '',
    autorizaTransmOrdens: '',
    adminCarteirasAdministradas: '',
    adminFundosInvestimento: '',
    classificacaoRiscoComitente: '',
    descricaoClassificacaoRisco: '',
    empresaSemFinsLucrativos: '',
    dataUltimaAtualizacao: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES' },
    { label: 'MARIA SILVA', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Jurídica', key: 'pessoa-juridica', active: true },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
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
          
          // Map legalEntity data to form
          const legalEntityData = customerData.legalEntity;
          
          this.formData.set({
            paisRegistro: legalEntityData?.legEntCountryName || 'tentando setar',
            atividadeEconomica: legalEntityData?.legEntEconomicActvName || '',
            grupoEconomico: legalEntityData?.legEntEconomicGroupName || '',
            naturezaJuridica: legalEntityData?.legEntLegalNatureCode?.toString() || '',
            indicadorCvm286: legalEntityData?.legEntCVM286Ind || '',
            autorizaTransmOrdens: legalEntityData?.legEntOrdersByThirdParties || '',
            adminCarteirasAdministradas: legalEntityData?.legEntManagedPortfolioAdmin || '',
            adminFundosInvestimento: legalEntityData?.legEntInvestFundManager || '',
            classificacaoRiscoComitente: legalEntityData?.legEntRiskClassificationInd?.toString() || '',
            descricaoClassificacaoRisco: legalEntityData?.legEntRiskClassificationDscn || '',
            empresaSemFinsLucrativos: legalEntityData?.legEntNonprofitCompany || '',
            dataUltimaAtualizacao: legalEntityData?.legEntFoundDate 
              ? this.formatDate(legalEntityData.legEntFoundDate) 
              : '',
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
    if (tab.key === 'investidor-nao-residente' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica-nao-residente', this.codigo]);
    }
    if (tab.key === 'pessoa-juridica-sfp' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica-sfp', this.codigo]);
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