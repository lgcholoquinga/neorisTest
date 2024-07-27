import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('@products/products.routes').then((r) => r.PRODUCTS_ROUTES),
  },
  {
    path: '404',
    loadComponent: () => import('@shared/pages/not-found/not-found.component'),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
