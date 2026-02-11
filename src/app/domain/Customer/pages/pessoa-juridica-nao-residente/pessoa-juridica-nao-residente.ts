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

export interface PjInvestidorNaoResidenteData {
  cnpjInvestidorNr: string;
  paisRegistro: string;
  jurisdicao: string;
  qualificacaoIcvm: string;
  tipoTitularidade: string;
  nif: string;
  contaPrivateBank: string;
  periodoResidenteExterior: string;
  dataInclusao: string;
  dataExclusao: string;
  tipoPessoaRepresentante: 'fisica' | 'juridica';
  cpfRepresentante: string;
  nomeRepresentante: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-pj-nao-residente',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pessoa-juridica-nao-residente.html',
  styleUrl: './pessoa-juridica-nao-residente.scss',
})
export class PessoaJuridicaNaoResidente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;
  isLoading = true;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

  readonly formData = signal<PjInvestidorNaoResidenteData>({
    cnpjInvestidorNr: '',
    paisRegistro: '',
    jurisdicao: '',
    qualificacaoIcvm: '',
    tipoTitularidade: '',
    nif: '',
    contaPrivateBank: '',
    periodoResidenteExterior: '',
    dataInclusao: '',
    dataExclusao: '',
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
    { label: 'Pessoa Jurídica', key: 'pessoa-juridica' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente', active: true },
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
    if (tab.key === 'pessoa-juridica' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica', this.codigo]);
    }
    if (tab.key === 'pessoa-juridica-sfp' && this.codigo) {
      this.router.navigate(['/customer/pessoa-juridica-sfp', this.codigo]);
    }
  }

  onTipoPessoaChange(tipo: 'fisica' | 'juridica'): void {
    this.formData.update(data => ({ ...data, tipoPessoaRepresentante: tipo }));
  }
}
