import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatTooltip } from '@angular/material/tooltip';

interface ToolbarItem {
    title: string;
    icon: string;
    url: string;
}

@Component({
    selector: 'crm-shell',
    standalone: true,
    imports: [ CommonModule, MatIcon, MatIconButton, MatToolbar, MatDrawerContainer, MatDrawer, MatDrawerContent, MatTooltip ],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
    public readonly toolbarItems: ToolbarItem[] = [
        {
            title: 'Dashboard',
            icon: 'crm:home',
            url: '',
        },
        {
            title: 'Users',
            icon: 'crm:users',
            url: '',
        },
    ];
}
