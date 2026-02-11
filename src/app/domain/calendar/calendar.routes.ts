import { Route } from "@angular/router";

export const CALENDAR_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('@domain/calendar/pages/calendar/calendar')
    }
]