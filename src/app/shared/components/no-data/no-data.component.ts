import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  templateUrl: './no-data.component.html'
})
export class NoDataComponent {
  @Input() text = 'No data yet';
}
