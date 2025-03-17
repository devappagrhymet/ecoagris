import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexLegend,
   
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  colors: any;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


export type ChartOptions_2 = {
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

@Component({
  selector: 'app-elevage-dashboard',
  standalone: true,
  imports: [HeaderComponent, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatChipsModule, 
    NgApexchartsModule, HeaderComponent],
  templateUrl: './elevage-dashboard.component.html',
  styleUrl: './elevage-dashboard.component.scss'
})
export class ElevageDashboardComponent {

  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions  : Partial<ChartOptions>;
  public chartOptions_2: Partial<ChartOptions_2>;
  public chartOptions_3: Partial<ChartOptions>;
  public chartOptions_4: Partial<ChartOptions_2>;
  public chartOptions_5: Partial<ChartOptions>;
  public chartOptions_6: Partial<ChartOptions_2>;
  public chartOptions_7: Partial<ChartOptions>;
  public chartOptions_8: Partial<ChartOptions_2>;
 
  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
  ) {
    /*--------Effectif cheptel (nombre)--------*/
      this.chartOptions = {
        series: [
            {
                name: "Effectif cheptel",
                data: [904774831902]
            }
        ],
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#ff0000"],
        stroke: {
            curve: "straight"
        },
        title: {
            text: "Courbe de tendance",
            align: "left"
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#EDEFF5",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2020"
            ],
            labels: {
                style: {
                    colors: "#000",
                    fontSize: "14px"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px"
                }
            },
            axisBorder: {
                show: false
            }
        }
    };

      this.chartOptions_2 = {
        series: [
            {
                name: "Effectif cheptel",
                data: [904774831902]
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
                columnWidth: "15%",
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
            "2020"
           
          
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
    /*--------Production viande (Tonne)--------*/
    this.chartOptions_3 = {
        series: [
            {
                name: "Production de la viande",
                data: [6676819379.80]
            }
        ],
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#ff0000"],
        stroke: {
            curve: "straight"
        },
        title: {
            text: "Courbe de tendance",
            align: "left"
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#EDEFF5",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2020"
               
            ],
            labels: {
                style: {
                    colors: "#000",
                    fontSize: "14px"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px"
                }
            },
            axisBorder: {
                show: false
            }
        }
    };

    this.chartOptions_4 = {
        series: [
            {
                name: "Production de la viande",
                data: [6676819379.80]
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
                columnWidth: "15%",
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
            "2020"
        
          
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
    /*--------Production des oeufs (Tonne)--------*/
      this.chartOptions_5 = {
        series: [
            {
                name: "Production des oeufs",
                data: [456276186.70]
            }
        ],
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#ff0000"],
        stroke: {
            curve: "straight"
        },
        title: {
            text: "Courbe de tendance",
            align: "left"
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#EDEFF5",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2020"
              
            ],
            labels: {
                style: {
                    colors: "#000",
                    fontSize: "14px"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px"
                }
            },
            axisBorder: {
                show: false
            }
        }
    };

      this.chartOptions_6 = {
        series: [
            {
              name: "Production des oeufs",
              data: [456276186.70]
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
                columnWidth: "15%",
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
            "2020"
           
          
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
    /*--------Production du lait (Tonne)--------*/
      this.chartOptions_7 = {
        series: [
            {
                name: "Production du lait",
                data: [46227177118.68]
            }
        ],
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#ff0000"],
        stroke: {
            curve: "straight"
        },
        title: {
            text: "Courbe de tendance",
            align: "left"
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#EDEFF5",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2020"
              
            ],
            labels: {
                style: {
                    colors: "#000",
                    fontSize: "14px"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#a9a9c8",
                    fontSize: "14px"
                }
            },
            axisBorder: {
                show: false
            }
        }
    };

      this.chartOptions_8 = {
        series: [
            {
              name: "Production du lait",
              data: [46227177118.68]
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
                columnWidth: "15%",
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
            "2020"
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
