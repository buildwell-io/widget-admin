import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { EventBusService } from './services/shared/event-bus.service';
import { SharedService } from './services/shared/shared.service';

@Component({
  standalone: true,
  selector: 'crm-root',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {

  }

  ngOnInit() {
    this.isLoggedIn = this.sharedService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.sharedService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res: any) => {
        console.log(res);
        this.sharedService.clean();

        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
