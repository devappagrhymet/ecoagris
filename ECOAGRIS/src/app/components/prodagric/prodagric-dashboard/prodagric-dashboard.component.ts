import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
import { HeaderComponent } from '../../common/header/header.component';

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

/* type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
      style?: {
          colors?: string | string[];
          fontSize?: string;
      };
  };
}; */

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
  selector: 'app-prodagric-dashboard',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatChipsModule, 
            NgApexchartsModule, HeaderComponent],
  templateUrl: './prodagric-dashboard.component.html',
  styleUrl: './prodagric-dashboard.component.scss',
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1)',
        'background-color': '#FAFAD2',
        'color':'#000',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
    ])
  ]
})
export class ProdagricDashboardComponent {

  animationStates: { [key: number]: 'default' | 'active' } = {};
  
  campagnes!: [];
  pays!: [];
  indicateurs!: [];

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
    /*********Céréales*********** */
    this.chartOptions = {
        series: [
            {
                name: "Quantité Production céréaliere (T)",
                data: [8090, 8234, 6003, 6065049, 5297171, 5817392]
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
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
              
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
    /*********Legumineuses*********** */
    this.chartOptions_3 = {
        series: [
            {
                name: "Quantité production légimuneuses (T)",
                data: [1916078, 2035339, 2010142, 2458889, 2463773, 2473664]
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
        colors: ["#FEB019"],
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
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
              
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

    /*********Oléagineux*********** */
    this.chartOptions_5 = {
        series: [
            {
                name: "Quantité production oléagineux (T)",
                data: [9638, 10033, 10033, 704876, 658612, 698672.7]
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
        colors: ["#26a69a"],
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
            borderColor: "#FF4560",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
              
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
    /*********Racines et tubercules*********** */
    this.chartOptions_7 = {
        series: [
            {
                name: "Quantité production racines et tuberciles (T)",
                data: [442164, 416668, 604880, 670936, 885234, 1103733]
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
        colors: ["#008FFB"],
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
            borderColor: "#FF4560",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
              
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
    /*=========================*/
  }

 

  displayedColumns: string[] = [
    'id',
    'campagne',
    'valeur',
    'unite',
    'indicateur',
    'speculation',
    'pays',
  ];


  dataSource!: MatTableDataSource<any>;

  params_campagne;
  params_indicateur;
  params_pays;
   
  indicateur_label:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
   
    this.indicateur_label = "Quantité du production ";
  }

   ngOnInit(): void {
     this._getProdagricIndItemList(2012,12,53);
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }

      
      /*===================*/
      this._getCampagneList();
      this._getIndicateurBySousysteme(1);
      this._getPaysList();
   }

    /*==========================================*/
    #______________________Campagne________________
    _getCampagneList()
    {
      this.getCampagneList().subscribe(
        res =>{
          this.campagnes = res;
        },
        error => {
          console.log(error);
        }
      )
    }

    getCampagneList(): Observable<any> {
      return this._http.get('http://127.0.0.1:8000/api/parametre/campagnes');
    }
   #______________________pays________________
   _getPaysList()
   {
      this.getPaysList().subscribe(
        res =>{
          this.pays = res;
          //console.log(this.pays);
        },
        error => {
          console.log(error);
        }
      )
   }

   getPaysList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/divadmin/pays-list/0');
  }
  #__________________Indicateur_______________________________
   _getIndicateurBySousysteme(id)
   {
     this.getIndicateurList(id).subscribe(
       res =>{
         this.indicateurs = res;
         //console.log(this.sousSystemes);
       },
       error => {
         console.log(error);
       }
     )
   }
   getIndicateurList(id:number): Observable<any> {
     return this._http.get('http://127.0.0.1:8000/api/indicateur/get_indicateur_sousysteme/'+id);
   }
   /*==========================================*/
   
   onChangeCampagne(event){
    this.params_campagne = event.value;
   }

   onChangePays(event){
    this.params_pays = event.value;

   }

   onChangeIndicateur(event){
    this.params_indicateur = event.value;

    //this._getProdagricIndItemList(this.params_campagne,this.params_pays,this.params_indicateur);
    switch (this.params_indicateur)
    { 
      /*--------Superficie---------*/
      case  52:
            this.indicateur_label = "Superfice des principales cultures (ha)";
            /*********Céréales*********** */
              this.chartOptions = {
                series: [
                    {
                        name: "Superficie production Céréaliere",
                        data: [321, 682, 1043, 8492, 10700, 12908]
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
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019"
                      
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
                      name: "Superficie Production Céréaliere",
                      data: [321, 682, 1043, 8492, 10700, 12908]
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
                        columnWidth: "40%",
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
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019"
                  
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
            /*********Legumineuses*********** */
            this.chartOptions_3 = {
                series: [
                    {
                        name: "Superficie production légimuneuses",
                        data: [1436, 2880, 4324, 7198, 9038, 10878]
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
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019"
                      
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
                      name: "Superficie production légimuneuses",
                      data: [1436, 2880, 4324, 7198, 9038, 10878]
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
                        columnWidth: "40%",
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
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019"
                  
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
            /*********Oléagineux*********** */
            this.chartOptions_5 = {
                series: [
                    {
                        name: "Superficie production oléagineux",
                        data: [648, 1370, 2092, 5644, 7116, 8588]
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
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019"
                      
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
                      name: "Superficie production oléagineux",
                      data: [648, 1370, 2092, 5644, 7116, 8588]
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
                        columnWidth: "40%",
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
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019"
                  
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
            /*********Racines et tubercules*********** */
            this.chartOptions_7 = {
              series: [
                  {
                      name: "Superficie production racines et tuberciles",
                      data: [993, 2076, 3159, 4254, 5358, 6462]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Superficie production racines et tuberciles",
                    data: [993, 2076, 3159, 4254, 5358, 6462]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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

        break;
      /*--------Rendement---------*/
      case  53:
          this.indicateur_label = "Rendement des principales cultures (kg/ha)";
          /*********Céréales*********** */
            this.chartOptions = {
              series: [
                  {
                      name: "Rendement Production Céréalière",
                      data: [25.20, 12.07, 5.75, 4272.83, 2963.38, 2698.69]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Rendement Production Céréalière",
                    data: [25.20, 12.07, 5.75, 4272.83, 2963.38, 2698.69]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
          /*********Legumineuses*********** */
          this.chartOptions_3 = {
              series: [
                  {
                      name: "Rendement Légimuneuses",
                      data: [4305.28, 2521.06, 1720.64, 1601.57, 1294.33, 1089.23]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Rendement Légimuneuses",
                    data: [4305.28, 2521.06, 1720.64, 1601.57, 1294.33, 1089.23]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
          /*********Oléagineux*********** */
          this.chartOptions_5 = {
              series: [
                  {
                      name: "Rendement Oléagineux",
                      data: [29.77, 14.65, 9.59, 501.14, 371.07, 326.10]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Rendement Oléagineux",
                    data: [29.77, 14.65, 9.59, 501.14, 371.07, 326.10]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
          /*********Racines et tubercules*********** */
          this.chartOptions_7 = {
              series: [
                  {
                      name: "Rendement racines et tuberciles",
                      data: [1336.38, 601.95, 574.67, 473.36, 495.84, 512.59]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Rendement racines et tuberciles",
                    data: [1336.38, 601.95, 574.67, 473.36, 495.84, 512.59]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
    
        break;
      /*--------Production---------*/
      case  54:
        this.indicateur_label = "Production des principales cultures (Tonne)";
          /*********Céréales*********** */
            this.chartOptions = {
              series: [
                  {
                      name: "Quantité Production céréaliere",
                      data: [8090, 8234, 6003, 6065049, 5297171, 5817392]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Quantité Production céréaliere",
                    data: [8090, 8234, 6003, 6065049, 5297171, 5817392]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
          /*********Legumineuses*********** */
          this.chartOptions_3 = {
              series: [
                  {
                      name: "Quantité production légimuneuses",
                      data: [1916078, 2035339, 2010142, 2458889, 2463773, 2473664]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                  name: "Quantité production légimuneuses",
                  data: [1916078, 2035339, 2010142, 2458889, 2463773, 2473664]
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
                    columnWidth: "40%",
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
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019"
              
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
        /*********Oléagineux*********** */
        this.chartOptions_5 = {
              series: [
                  {
                      name: "Quantité production oléagineux",
                      data: [9638, 10033, 10033, 704876, 658612, 698672.7]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Quantité production oléagineux",
                    data: [9638, 10033, 10033, 704876, 658612, 698672.7]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
        /*********Racines et tubercules*********** */
        this.chartOptions_7 = {
              series: [
                  {
                      name: "Quantité production racines et tuberciles",
                      data: [442164, 416668, 604880, 670936, 885234, 1103733]
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
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018",
                      "2019"
                    
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
                    name: "Quantité production racines et tuberciles",
                    data: [442164, 416668, 604880, 670936, 885234, 1103733]
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
                      columnWidth: "40%",
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
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019"
                
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
        break;
      
      /*---------------------------*/
      default:
        
        break;
    }


   }
 

  _getProdagricIndItemList(params_campagne,params_pays,params_indicateur) {
    this.getProdagricIndItemList(params_campagne,params_pays,params_indicateur).subscribe({
      next: (res) => {
    
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getProdagricIndItemList(params_campagne,params_pays,params_indicateur): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/get_prodagric/'+params_campagne+'-'+params_pays+'-'+params_indicateur);
  }

  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
  
  

}


