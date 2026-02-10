import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
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
