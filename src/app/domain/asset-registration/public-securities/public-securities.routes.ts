import { Route } from '@angular/router';

export const PUBLIC_SECURITIES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/list/public-securities-list').then(m => m.PublicSecuritiesList),
  },
  {
    path: 'details/:codigo',
    loadComponent: () => import('./pages/details/public-securities-details').then(m => m.PublicSecuritiesDetails),
  }
];
