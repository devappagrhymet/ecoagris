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
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule,
            MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgFor, MatChipsModule, NgApexchartsModule],
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
  public chartOptions: Partial<ChartOptions>;

 
  public chartOptions_2: Partial<ChartOptions_2>;
 
  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
  ) {
    this.chartOptions = {
      series: [
          {
              name: "Rendement du Mil",
              data: [36390, 30342, 29939, 35226, 37144, 36480]
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
              "2016",
              "2017"
            
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
          name: "Rendement du Mil",
          data: [36390, 30342, 29939, 35226, 37144, 36480]
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
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017"
      
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
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

    this._getProdagricIndItemList(this.params_campagne,this.params_pays,this.params_indicateur);
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


