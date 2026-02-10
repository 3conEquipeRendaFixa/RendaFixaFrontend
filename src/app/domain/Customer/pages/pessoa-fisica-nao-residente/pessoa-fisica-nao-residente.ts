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

export interface InvestidorNaoResidenteData {
  cpfInvestidor: string;
  contaPrivateBank: string;
  tipoTitularidade: string;
  possuiNif: string;
  nif: string;
  dataComunicadoSaida: string;
  qualificacaoIcvm: string;
  jurisdicao: string;
  periodoResidenteExteriorDe: string;
  periodoResidenteExteriorAte: string;
  tipoPessoaRepresentante: 'fisica' | 'juridica';
  cpfRepresentante: string;
  nomeRepresentante: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-pf-nao-residente',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-fisica-nao-residente.html',
  styleUrl: './pessoa-fisica-nao-residente.scss',
})
export class PessoaFisicaNaoResidente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

  readonly formData = signal<InvestidorNaoResidenteData>({
    cpfInvestidor: '',
    contaPrivateBank: '',
    tipoTitularidade: '',
    possuiNif: '',
    nif: '',
    dataComunicadoSaida: '',
    qualificacaoIcvm: '',
    jurisdicao: '',
    periodoResidenteExteriorDe: '',
    periodoResidenteExteriorAte: '',
    tipoPessoaRepresentante: 'fisica',
    cpfRepresentante: '',
    nomeRepresentante: '',
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
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente', active: true },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Contas', key: 'contas' },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp' },
  ];

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.isLoading = false;
  }

  goBack(): void {
    this.router.navigate(['/asset-registration/private-bound', this.codigo]);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.key === 'pessoa-fisica-sfp' && this.codigo) {
      this.router.navigate(['/asset-registration/private-bound', this.codigo, 'pessoa-fisica-spp']);
    }
  }

  onTipoPessoaChange(tipo: 'fisica' | 'juridica'): void {
    this.formData.update(data => ({ ...data, tipoPessoaRepresentante: tipo }));
  }
}
