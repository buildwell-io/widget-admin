import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RailNavigationComponent } from '../rail-navigation/rail-navigation.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'crm-shell',
    standalone: true,
    imports: [ CommonModule, RailNavigationComponent, HeaderComponent ],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
}
