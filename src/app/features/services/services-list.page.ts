import { Component } from '@angular/core';
import { NoDataComponent } from '../../shared/components/no-data/no-data.component';

@Component({
  standalone: true,
  template: `<h2>Services</h2><app-no-data/>`,
  imports: [NoDataComponent]
})
export class ServicesListPage {}
