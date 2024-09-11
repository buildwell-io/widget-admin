import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'crm-rail-navigation',
  standalone: true,
  imports: [ CommonModule, MatIcon ],
  templateUrl: './rail-navigation.component.html',
  styleUrl: './rail-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'navigation'
  },
})
export class RailNavigationComponent {}
