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

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

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
    this.isLoading = false;
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/private-bound', this.codigo]);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.key === 'investidor-nao-residente' && this.codigo) {
      this.router.navigate(['/asset-registration/private-bound', this.codigo, 'pessoa-fisica-nao-residente']);
    }
  }
}
