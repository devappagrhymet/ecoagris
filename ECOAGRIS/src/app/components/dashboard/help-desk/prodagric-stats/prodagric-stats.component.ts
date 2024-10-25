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
  selector: 'app-prodagric-stats',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
  templateUrl: './prodagric-stats.component.html',
  styleUrl: './prodagric-stats.component.scss'
})
export class ProdagricStatsComponent {
     

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
  
   
    public chartOptions_2: Partial<ChartOptions_2>;
   
    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Part de l'agriculture dans le PIB",
                    data: [24.78, 22.73, 23.98, 23.82, 26.48]
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
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016"
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
                name: "Part de l'agriculture dans le PIB",
                data: [24.78, 22.73, 23.98, 23.82, 26.48]
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
                columnWidth: "25%",
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
                "2012",
                "2013",
                "2014",
                "2015",
                "2016"
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
