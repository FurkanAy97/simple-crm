import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(SalesChartComponent) salesChartComponent!: SalesChartComponent;

  ngAfterViewInit() {
    if (this.salesChartComponent) {
      this.salesChartComponent.initializeChart();
    }
  }
}
