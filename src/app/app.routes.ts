import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@domain/menu/menu.routes').then(m => m.MENU_ROUTES)
    },
    {
        path: 'calendar',
        loadChildren: () => import('@domain/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES)
    }
];
