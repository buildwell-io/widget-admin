import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';

@Component({
    standalone: true,
    imports: [ RouterModule, ShellComponent ],
    selector: 'crm-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'crm';
}
