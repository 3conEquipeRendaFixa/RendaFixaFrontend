import { Route } from "@angular/router";

export const ASSET_REGISTRATION_ROUTES: Route[] = [ 
    {
        path: 'private-bound',
        loadChildren: () => import('./private-bound/private-bound.routes').then(m => m.PRIVATE_BOUND_ROUTES),
    },
    {
        path: 'public-bounds',
        loadChildren: () => import('./public-bounds/public-bounds.routes').then(m => m.PUBLIC_BOUNDS_ROUTES),
    }
]