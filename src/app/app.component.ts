import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="dashboard-container">
      <app-dashboard></app-dashboard>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Campaign Manager Dashboard';
}