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

export interface PessoaJuridicaSfpData {
  moeda: string;
  valorPatrimonioLiquido: string;
  dtPatrimonioLiquido: string;
  valorCapacidadeFin: string;
  dtCapacidadeFin: string;
  fatMedioMensal: string;
  dtRefFatMedMensal: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-pj-sfp',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-juridica-sfp.html',
  styleUrl: './pessoa-juridica-sfp.scss',
})
export class PessoaJuridicaSFP implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

  readonly formData = signal<PessoaJuridicaSfpData>({
    moeda: '',
    valorPatrimonioLiquido: '',
    dtPatrimonioLiquido: '',
    valorCapacidadeFin: '',
    dtCapacidadeFin: '',
    fatMedioMensal: '',
    dtRefFatMedMensal: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES' },
    { label: 'MARIA SILVA', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Jurídica', key: 'pessoa-juridica' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Contas', key: 'contas' },
    { label: 'Pessoa Jurídica SFP', key: 'pessoa-juridica-sfp', active: true },
  ];

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.isLoading = false;
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.key === 'pessoa-juridica' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica', this.codigo]);
    }
    if (tab.key === 'investidor-nao-residente' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica-nao-residente', this.codigo]);
    }
  }
}
