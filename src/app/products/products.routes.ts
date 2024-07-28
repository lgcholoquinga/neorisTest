import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/list-product/list-product.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./components/create-product/create-product.component'),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./components/edit-product/edit-product.component'),
      },
    ],
  },
];
