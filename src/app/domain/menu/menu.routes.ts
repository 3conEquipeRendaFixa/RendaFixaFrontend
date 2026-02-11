import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/menu/menu').then(m => m.MenuComponent)
  }
];
