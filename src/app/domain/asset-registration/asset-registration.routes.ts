import { Route } from "@angular/router";

export const ASSET_REGISTRATION_ROUTES: Route[] = [ 
    {
        path: 'private-securities',
        loadComponent: () => import('@domain/asset-registration/pages/private-securities/private-securities').then(m => m.PrivateSecurities)
    },
    {
        path: 'public-securities',
        loadComponent: () => import('@domain/asset-registration/pages/public-securities/public-securities').then(m => m.PublicSecurities)
    }
]