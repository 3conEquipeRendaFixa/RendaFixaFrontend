import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '@widget/components/breadcrumb/breadcrumb';

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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-pessoa-juridica',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-juridica.html',
  styleUrl: './pessoa-juridica.scss',
})
export class PessoaJuridica implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

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
    this.isLoading = false;
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
}
