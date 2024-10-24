import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  stroke: ApexStroke;
  colors: any;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-feature2',
  templateUrl: './feature2.component.html',
  styleUrls: ['./feature2.component.scss']
})
export class Feature2Component {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  pays!: [];
  indicateurs!: [];
  speculations!: [];

  data_valeur!: [];
  data_annee!: [];
  indic_label;

  params_indicateur;
  params_speculation;
  params_pays;
  data_campagne: any =[];
  data_valeur_gen: any =[];

  constructor(private _http: HttpClient) {
        this.chartOptions = {
            series: [
                {
                  name: "Quantité produite (T)",
                  data: [3862158, 2921981, 3321752, 3404812, 3878009, 3790026]
                }, 
            ],
            chart: {
                height: 500,
                type: "line",
                toolbar: {
                    show: true
                }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: "smooth"
            },
            colors: ["#DC143C"],
            xaxis: {
                type: "datetime",
                categories:  ["2012", "2013", "2014", "2015", "2016", "2017"],
                labels: {
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    }
                }
            },
            tooltip: {
                x: {
                    format: "yyyy"
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "14px",
                    }
                },
                axisBorder: {
                    show: false
                }
            },
            legend: {
                fontSize: "14px",
                labels: {
                    colors: '#5B5B98'
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EDEFF5"
            }
        };

    

  }

  ngOnInit(): void {
    this._getIndicateurBySousysteme(1);
        this._getPaysList();
        this._getSpeculationList(); 
  } 

  

  onChangePays(event){ 
   this.params_pays = event.target.value;
  // this._getIndicItemList(this.params_indicateur,this.params_speculation,this.params_pays);
    console.log(this.params_pays);
  }

  onChangeIndicateur(event){
    this.params_indicateur = event.target.value;
   // this._getIndicItemList(this.params_indicateur,this.params_speculation,this.params_pays);
    console.log(this.params_indicateur);
  }

  onChangeSpeculation(event){
    this.params_speculation = event.target.value;
   // this._getIndicItemList(this.params_indicateur,this.params_speculation,this.params_pays);
    console.log(this.params_speculation);

   

     
  }

  getDataIndicators(){
    this._getIndicItemList(this.params_indicateur,this.params_speculation,this.params_pays);
   
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
    return this._http.get(' http://127.0.0.1:8000/api/divadmin/pays-list/0');
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


   #__________________Speculation________________________________________________

   _getSpeculationList()
   {
      this.getSpeculationList().subscribe(
        res =>{
          this.speculations = res;
          //console.log(this.pays);
        },
        error => {
          console.log(error);
        }
      )
   }

   getSpeculationList(): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/speculation/');
  }


 #________________________________________________________________
  _getIndicItemList(params_indicateur,params_speculation,params_pays)
  {
     this.getIndicItemList(params_indicateur,params_speculation,params_pays).subscribe(
       res =>{
  
        let i;
        //console.log("length : "+res["result"].length);

        for(i=0;i<res["result"].length;i++){
       
         this.data_campagne.push(res["result"][i]["campagne"]);
         this.data_valeur_gen.push(res["result"][i]["valeur_gen"]);

         
        }
        //console.log("Annee : "+this.data_campagne);
       // console.log("Valeur : "+ this.data_valeur_gen);
       //
        /*===================================================================*/
            this.chartOptions = {
              series: [
                {
                      name: "Superficie cultivée (ha)",
                      data: this.data_valeur_gen
                  },
                /*   {
                      name: "Quantité produite (T)",
                      data: [3862158, 2921981, 3321752, 3404812, 3878009, 3790026]
                  }, 
                  {
                    name: "Rendement (kg/ha)",
                    data: [36390.68, 30342.73, 29939.45, 35226.09, 37144.10, 36480.59]
                  },*/
              ],
              chart: {
                  height: 500,
                  type: "line",
                  toolbar: {
                      show: true
                  }
              },
              dataLabels: {
                  enabled: true
              },
              stroke: {
                  curve: "smooth"
              },
              colors: ["#48a74a", "#2db6f5", "#e525d2"],
              xaxis: {
                  type: "datetime",
                  categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
                  labels: {
                      style: {
                          colors: "#a9a9c8",
                          fontSize: "14px",
                      }
                  }
              },
              tooltip: {
                  x: {
                      format: "yyyy"
                  }
              },
              yaxis: {
                  labels: {
                      style: {
                          colors: "#a9a9c8",
                          fontSize: "14px",
                      }
                  },
                  axisBorder: {
                      show: false
                  }
              },
              legend: {
                  fontSize: "14px",
                  labels: {
                      colors: '#5B5B98'
                  }
              },
              grid: {
                  show: true,
                  strokeDashArray: 5,
                  borderColor: "#EDEFF5"
              }
          };
        /*===================================================================*/
        
        
       },
       error => {
         console.log(error);
       }
     )
  }

  getIndicItemList(params_indicateur,params_speculation,params_pays): Observable<any> {
    return this._http.get('http://127.0.0.1:8000/api/prodagric/indicateurItemByAnnee?params_indicateur='+params_indicateur+'&params_speculation='+params_speculation+'&params_pays='+params_pays);
  }

 public generateData(baseval:any, count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}

}
