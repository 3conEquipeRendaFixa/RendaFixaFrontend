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
    path: 'dados-basicos/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/customer-basic-data/customer-basic-data').then(
        (m) => m.CustomerBasicsDatas
      ),
  },
  {
    path: 'fatca-irs/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/customer-fatca/customer-fatca').then(
        (m) => m.CustomerFatca
      ),
  },
  {
    path: 'pessoa-fisica/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/individual-customer/individual-customer').then(
        (m) => m.CustomerNaturalPerson
      ),
  },
  {
    path: 'pessoa-fisica-nao-residente',
    loadComponent: () =>
      import('@domain/Customer/pages/individual-customer-non-resident/individual-customer-non-resident').then(
        (m) => m.PessoaFisicaNaoResidente
      ),
  },
  {
    path: 'pessoa-fisica-nao-residente/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/individual-customer-non-resident/individual-customer-non-resident').then(
        (m) => m.PessoaFisicaNaoResidente
      ),
  },
  {
    path: 'pessoa-fisica-spp',
    loadComponent: () =>
      import('@domain/Customer/pages/individual-customer-sfp/individual-customer-sfp').then(
        (m) => m.PessoaFisicaSPP
      ),
  },
  {
    path: 'pessoa-fisica-spp/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/individual-customer-sfp/individual-customer-sfp').then(
        (m) => m.PessoaFisicaSPP
      ),
  },
  {
    path: 'detail/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/client-detail/client-detail').then(
        (m) => m.ClientDetail
      ),
  },
  {
    path: 'pessoa-juridica',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer/legal-customer').then(
        (m) => m.PessoaJuridica
      ),
  },
  {
    path: 'pessoa-juridica/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer/legal-customer').then(
        (m) => m.PessoaJuridica
      ),
  },
  {
    path: 'pessoa-juridica-nao-residente',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer-non-resident/legal-customer-non-resident').then(
        (m) => m.PessoaJuridicaNaoResidente
      ),
  },
  {
    path: 'pessoa-juridica-nao-residente/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer-non-resident/legal-customer-non-resident').then(
        (m) => m.PessoaJuridicaNaoResidente
      ),
  },
  {
    path: 'pessoa-juridica-sfp',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer-sfp/legal-customer-sfp').then(
        (m) => m.PessoaJuridicaSFP
      ),
  },
  {
    path: 'pessoa-juridica-sfp/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/legal-customer-sfp/legal-customer-sfp').then(
        (m) => m.PessoaJuridicaSFP
      ),
  },
  {
  path: 'contas/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/accounts/accounts').then(
      (m) => m.Contas
    ),
},
{
  path: 'documentos/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/documents/documents').then(
      (m) => m.Documentos
    ),
},
{
  path: 'enderecos/:codigo',
  loadComponent: () =>
    import('@domain/Customer/pages/addresses/addresses').then(
      (m) => m.Enderecos
    ),
},
];
