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
      import('@domain/Customer/pages/customer-basics-datas/customer-basics-datas').then(
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
      import('@domain/Customer/pages/customer-natural-person/customer-natural-person').then(
        (m) => m.CustomerNaturalPerson
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
];
