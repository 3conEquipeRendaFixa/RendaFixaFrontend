import { Route } from '@angular/router';

export const PRIVATE_SECURITIES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/list/private-securities-list').then(m => m.PrivateSecuritiesList),
  },
  {
    path: 'details/:codigo',
    loadComponent: () => import('./pages/details/private-securities-details').then(m => m.PrivateSecuritiesDetails),
  }
];
