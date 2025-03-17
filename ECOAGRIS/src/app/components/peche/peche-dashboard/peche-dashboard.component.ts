import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

/****************histogramme**************** */
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
      style?: {
          colors?: string | string[];
          fontSize?: string;
      };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
/****************FIn histogramme************ */

@Component({
  selector: 'app-peche-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterLink, MatCardModule, NgApexchartsModule],
  templateUrl: './peche-dashboard.component.html',
  styleUrl: './peche-dashboard.component.scss'
})
export class PecheDashboardComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
      this.chartOptions = {
          series: [
              {
                  name: "Production de la pêche et de l'aquaculture",
                  data: [43950, 54920, 34595, 34560]
              }
          ],
          chart: {
              height: 350,
              type: "bar",
              events: {
                  click: function(chart, w, e) {
                      // console.log(chart, w, e)
                  }
              }
          },
          colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
          ],
          plotOptions: {
              bar: {
                  columnWidth: "45%",
                  distributed: true
              }
          },
          dataLabels: {
              enabled: false
          },
          legend: {
              show: false
          },
          grid: {
              show: false
          },
          xaxis: {
              categories: [
                  "2020",
                  "2021",
                  "2022",
                  "2023"
                 
              ],
              labels: {
                  style: {
                      colors: [
                          "#008FFB",
                          "#00E396",
                          "#FEB019",
                          "#FF4560",
                          "#775DD0",
                          "#546E7A",
                          "#26a69a",
                          "#D10CE8"
                      ],
                      fontSize: "12px"
                  }
              }
          }
      };
  }
}
