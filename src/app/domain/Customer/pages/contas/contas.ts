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
  templateUrl: './contas.html',
  styleUrl: './contas.scss',
})
export class Contas implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);

  readonly clientName = signal<string>('');
  readonly clientStatus = signal<'ativo' | 'inativo'>('ativo');

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

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Física', key: 'pessoa-fisica' },
    { label: 'Contas', key: 'contas', active: true },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp' },
    { label: 'Documentos', key: 'documentos', dark: true },
    { label: 'Endereços', key: 'enderecos', dark: true },
    { label: 'Telefones', key: 'telefones', dark: true },
    { label: 'E-mails', key: 'emails', dark: true },
    { label: 'Relacionamentos', key: 'relacionamentos', dark: true },
  ];

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
    if (!this.codigo) return;
    
    const routes: Record<string, string> = {
      'pessoa-fisica-sfp': `/customer/pessoa-fisica-spp/${this.codigo}`,
      'investidor-nao-residente': `/customer/pessoa-fisica-nao-residente/${this.codigo}`,
      'pessoa-juridica': `/customer/pessoa-juridica/${this.codigo}`,
    };

    if (routes[tab.key]) {
      this.router.navigate([routes[tab.key]]);
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