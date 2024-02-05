import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component').then(l => l.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component').then(l => l.SignUpComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.routing').then(r => r.AdminLayoutRoutes),
      },
    ],
  },
];

