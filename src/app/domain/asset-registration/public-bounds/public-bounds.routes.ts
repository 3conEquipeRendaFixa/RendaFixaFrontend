import { Route } from '@angular/router';

export const PUBLIC_BOUNDS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/list/public-bounds-list').then(m => m.PublicBoundsList),
  },
  {
    path: ':codigo',
    loadComponent: () => import('./pages/details/public-bounds-details').then(m => m.PublicBoundsDetails),
  }
];
