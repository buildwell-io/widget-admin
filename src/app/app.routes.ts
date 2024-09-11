import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.SignInComponent),
    },
    {
        path: '',
        loadComponent: () => import('./components/shell/shell.component').then((c) => c.ShellComponent),
        children: [],
    },
];
