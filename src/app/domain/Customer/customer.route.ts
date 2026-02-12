import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@domain/Customer/pages/customer-list/customer-list').then(
        (m) => m.CustomerList
      ),
  },
  {
    path: 'pessoa-fisica-nao-residente',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-fisica-nao-residente/pessoa-fisica-nao-residente').then(
        (m) => m.PessoaFisicaNaoResidente
      ),
  },
  {
    path: 'pessoa-fisica-nao-residente/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-fisica-nao-residente/pessoa-fisica-nao-residente').then(
        (m) => m.PessoaFisicaNaoResidente
      ),
  },
  {
    path: 'pessoa-fisica-spp',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-fisica-spp/pessoa-fisica-spp').then(
        (m) => m.PessoaFisicaSPP
      ),
  },
  {
    path: 'pessoa-fisica-spp/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-fisica-spp/pessoa-fisica-spp').then(
        (m) => m.PessoaFisicaSPP
      ),
  },
  {
    path: 'pessoa-juridica',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica/pessoa-juridica').then(
        (m) => m.PessoaJuridica
      ),
  },
  {
    path: 'pessoa-juridica/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica/pessoa-juridica').then(
        (m) => m.PessoaJuridica
      ),
  },
  {
    path: 'pessoa-juridica-nao-residente',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica-nao-residente/pessoa-juridica-nao-residente').then(
        (m) => m.PessoaJuridicaNaoResidente
      ),
  },
  {
    path: 'pessoa-juridica-nao-residente/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica-nao-residente/pessoa-juridica-nao-residente').then(
        (m) => m.PessoaJuridicaNaoResidente
      ),
  },
  {
    path: 'pessoa-juridica-sfp',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica-sfp/pessoa-juridica-sfp').then(
        (m) => m.PessoaJuridicaSFP
      ),
  },
  {
    path: 'pessoa-juridica-sfp/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/pessoa-juridica-sfp/pessoa-juridica-sfp').then(
        (m) => m.PessoaJuridicaSFP
      ),
  },
  {
  path: 'contas/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/contas/contas').then(
      (m) => m.Contas
    ),
},
{
  path: 'documentos/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/documentos/documentos').then(
      (m) => m.Documentos
    ),
},
{
  path: 'enderecos/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/enderecos/enderecos').then(
      (m) => m.Enderecos
    ),
},
];
