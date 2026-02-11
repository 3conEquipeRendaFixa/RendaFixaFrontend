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

export interface PessoaFisicaData {
  nacionalidade: string;
  naturalidadeUf: string;
  naturalidadeMunicipio: string;
  paisResidencia: string;
  genero: string;
  escolaridade: string;
  politicamenteExposto: string;
  pessoaVinculada: boolean;
  filiacaoPai: string;
  filiacaoMae: string;
  tipoDocumento: string;
  numeroDocumento: string;
  orgaoEmissor: string;
  paisEmissor: string;
  estadoEmissor: string;
}

@Component({
  selector: 'app-customer-natural-person',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './customer-natural-person.html',
  styleUrl: './customer-natural-person.scss',
})
export class CustomerNaturalPerson implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  codigo: string | null = null;

  readonly clientName = signal('Maria Silva');
  readonly clientStatus = signal<'ativo' | 'inativo'>('inativo');
  readonly clientModules = signal('Equities  |  Derivativos');

  readonly formData = signal<PessoaFisicaData>({
    nacionalidade: '',
    naturalidadeUf: '',
    naturalidadeMunicipio: '',
    paisResidencia: '',
    genero: '',
    escolaridade: '',
    politicamenteExposto: '',
    pessoaVinculada: false,
    filiacaoPai: '',
    filiacaoMae: '',
    tipoDocumento: '',
    numeroDocumento: '',
    orgaoEmissor: '',
    paisEmissor: '',
    estadoEmissor: '',
  });

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'PÁGINA INICIAL', route: '/' },
    { label: 'CADASTRO DE CLIENTES', route: '/customer' },
    { label: 'MARIA SILVA', current: true },
  ];

  readonly tabs: ClientTab[] = [
    { label: 'Dados Básicos', key: 'dados-basicos' },
    { label: 'FATCA IRS', key: 'fatca-irs' },
    { label: 'Pessoa Física', key: 'pessoa-fisica', active: true },
    { label: 'Contas', key: 'contas' },
    { label: 'Investidor Não Residente', key: 'investidor-nao-residente' },
    { label: 'Pessoa Física SFP', key: 'pessoa-fisica-sfp' },
    { label: 'Documentos', key: 'documentos' },
    { label: 'Endereços', key: 'enderecos' },
    { label: 'Telefones', key: 'telefones' },
    { label: 'E-mails', key: 'emails' },
    { label: 'Relacionamentos', key: 'relacionamentos' },
  ];

  private readonly tabRouteMap: Record<string, string> = {
    'dados-basicos': 'dados-basicos',
    'fatca-irs': 'fatca-irs',
    'pessoa-fisica': 'pessoa-fisica',
    'investidor-nao-residente': 'pessoa-fisica-nao-residente',
    'pessoa-fisica-sfp': 'pessoa-fisica-spp',
  };

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onTabClick(tab: ClientTab): void {
    if (tab.active) return;
    const route = this.tabRouteMap[tab.key];
    if (route && this.codigo) {
      this.router.navigate(['/customer', route, this.codigo]);
    }
  }

  onPessoaVinculadaChange(checked: boolean): void {
    this.formData.update(data => ({ ...data, pessoaVinculada: checked }));
  }
}
