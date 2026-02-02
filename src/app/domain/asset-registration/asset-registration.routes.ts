import { Route } from "@angular/router";

export const ASSET_REGISTRATION_ROUTES: Route[] = [ 
    {
        path: 'private-securities',
        loadChildren: () => import('./private-securities/private-securities.routes').then(m => m.PRIVATE_SECURITIES_ROUTES),
    },
    {
        path: 'public-securities',
        loadChildren: () => import('./public-securities/public-securities.routes').then(m => m.PUBLIC_SECURITIES_ROUTES),
    }
]