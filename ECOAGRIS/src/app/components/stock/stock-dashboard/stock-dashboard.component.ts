import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-stock-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './stock-dashboard.component.html',
  styleUrl: './stock-dashboard.component.scss'
})
export class StockDashboardComponent {

}
