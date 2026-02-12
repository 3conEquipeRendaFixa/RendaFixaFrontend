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

export interface ContaBalcaoData {
  titularContaInvestidor: string;
  contaDeposito: string;
  contaInvestidorSelic: string;
}

export interface ContaListadosData {
  accTypeAccCode: number;
  accTypeAccName: string;
  accRuleMovAcrn: string;
  accTypeCollateralCode: string;
  accAffinityCode: number;
  accStatRegCode: number;
  accStatRegDscn: string;
  accSendAccBvmfInd: string;
}

@Component({
  selector: 'app-contas',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Contas implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');
  readonly tipoPessoa = signal<'PF' | 'PJ'>('PF');

  codigo: string | null = null;
  isLoading = true;

  readonly contaBalcao = signal<ContaBalcaoData>({
    titularContaInvestidor: '',
    contaDeposito: '',
    contaInvestidorSelic: '',
  });

  readonly contasListados = signal<ContaListadosData[]>([]);

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
      { label: 'Contas', key: 'contas', active: true },
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

    if (this.codigo) {
      this.service.loadCustomerInformation(this.codigo).subscribe({
        next: (data: ICustomerInformationApiResponse) => {
          console.log('Customer information loaded:', data);

          // Cliente
          this.clientName.set(data.customer?.custCustName || 'Cliente');
          this.clientStatus.set(
            data.customer?.custStatRegCode === 1 ? 'ativo' : 'inativo'
          );
          this.tipoPessoa.set(
            data.customer?.custTypePsonCode === 'PF' ? 'PF' : 'PJ'
          );

          // Breadcrumb
          this.breadcrumbItems[2].label = this.clientName().toUpperCase();

          // Conta Balcão
          this.contaBalcao.set({
            titularContaInvestidor: data.customer?.custDepOwnAccNumber || '',
            contaDeposito: data.customer?.custDepIndividDepositAcc?.toString() || '',
            contaInvestidorSelic: data.customer?.custDepSelicAcc || '',
          });

          // Conta Listados
          this.contasListados.set(data.account || []);

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

  // Helpers para separar o número da conta titular
  getTitularPart1(): string {
    return this.contaBalcao().titularContaInvestidor?.substring(0, 5) || '';
  }

  getTitularPart2(): string {
    return this.contaBalcao().titularContaInvestidor?.substring(5, 8) || '';
  }

  getTitularPart3(): string {
    return this.contaBalcao().titularContaInvestidor?.substring(8, 10) || '';
  }
}