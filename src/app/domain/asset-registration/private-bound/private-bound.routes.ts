import { Route } from '@angular/router';

export const PRIVATE_BOUND_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/private-bound-list/private-bound-list').then(m => m.PrivateBoundList),
  },
  {
    path: ':codigo',
    loadComponent: () => import('./pages/private-bound-details/private-bound-details').then(m => m.PrivateBoundDetails),
  }
];
