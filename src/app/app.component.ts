import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [ RouterModule ],
    selector: 'crm-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}
