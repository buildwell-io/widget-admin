import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const appRoutes: Routes =[
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(l => l.LoginComponent)
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./dashboard/dashboard.component').then(d => d.DashboardComponent)
    },
      {
       path: '',
       component: AdminLayoutComponent,
       children: [{
         path: '',
         loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
               children: [
                   {
                       path: '',
                       loadChildren: () => import('./layouts/admin-layout/admin-layout.routing').then(r => r.AdminLayoutRoutes)
                   }
               ]
           }
       ]
     }
];

