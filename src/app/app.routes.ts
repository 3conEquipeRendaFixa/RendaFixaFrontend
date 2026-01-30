import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@core/layout/main/main-layout').then(m => m.MainLayout),
        children: [
            {
                path: '',
                loadChildren: () => import('@domain/menu/menu.routes').then(m => m.MENU_ROUTES)
            },
            {
                path: 'calendar',
                loadChildren: () => import('@domain/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES)
            },
            {
                path: 'asset-registration',
                loadChildren: () => import('@domain/asset-registration/asset-registration.routes').then(m => m.ASSET_REGISTRATION_ROUTES)
            }
        ]
    },
];
