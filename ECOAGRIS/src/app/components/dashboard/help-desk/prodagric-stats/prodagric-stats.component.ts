import { Component, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
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
    NgApexchartsModule
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

@Component({
  selector: 'app-prodagric-stats',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
  templateUrl: './prodagric-stats.component.html',
  styleUrl: './prodagric-stats.component.scss'
})
export class ProdagricStatsComponent {
     
  
  /* series: [
    {
      name: "Quantité produite (T)",
      data: [3862158, 2921981, 3321752, 3404812, 3878009, 3790026]
    }, 
],

categories:  ["2012", "2013", "2014", "2015", "2016", "2017"], */
   

    
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Quantité produite (T)",
                    data: [3862158, 2921981, 3321752, 3404812, 3878009, 3790026]
                }
            ],
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: true
                }
            },
            dataLabels: {
                enabled: true
            },
            colors: ["#757fef"],
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Quantité produite (T)",
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
                categories:  ["2012", "2013", "2014", "2015", "2016", "2017"],
                
                labels: {
                    style: {
                        colors: "#a9a9c8",
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
    }

}
