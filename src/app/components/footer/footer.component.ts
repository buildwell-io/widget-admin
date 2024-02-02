import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'crm-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    DatePipe,
  ],
  styleUrls: [ './footer.component.css' ],
})
export class FooterComponent {
  test : Date = new Date();
}
