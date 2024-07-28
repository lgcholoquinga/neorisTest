import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Products',
    loadComponent: () => import('./home.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/list-product/list-product.component'),
      },
      {
        path: 'create',
        title: 'Create Product',
        loadComponent: () =>
          import('./components/create-product/create-product.component'),
      },
      {
        path: 'edit/:id',
        title: 'Edit Product',
        loadComponent: () =>
          import('./components/edit-product/edit-product.component'),
      },
    ],
  },
];
