import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { USER_TKNS } from '../../constants/app.constants';
import { StorageService } from '../../services/shared/storage.service';
import { finalize } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/widget-estimator', title: 'Widget Calculator',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'bubble_chart', class: '' },
];

@Component({
    selector: 'crm-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLinkActive,
    RouterLink,
    MatIconModule,
  ],
    styleUrls: [ './sidebar.component.scss' ],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly router: Router
    ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.storageService.removeItem(USER_TKNS);
          this.router.navigate(['/sign-in'])
        })
      )
      .subscribe()
  }

  // HELPERS
  get localStorage() {
    return window.localStorage;
  }
}
