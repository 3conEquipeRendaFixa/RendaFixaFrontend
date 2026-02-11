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
    path: 'detail/:codigo',
    loadComponent: () =>
      import('@domain/Customer/pages/client-detail/client-detail').then(
        (m) => m.ClientDetail
      ),
  },
];
