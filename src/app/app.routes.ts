import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calendar',
        loadChildren: () => import('@domain/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES)
    }
];
