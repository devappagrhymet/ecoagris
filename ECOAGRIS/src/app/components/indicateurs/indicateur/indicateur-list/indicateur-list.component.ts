import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../common/header/header.component';

import { IndicateurService } from '../../../../_services/indicateur.service'

@Component({
  selector: 'app-indicateur-list',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule,
     MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule, HeaderComponent ],
  providers: [IndicateurService],
  templateUrl: './indicateur-list.component.html',
  styleUrl: './indicateur-list.component.scss',
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
export class IndicateurListComponent {
  
  animationStates: { [key: number]: 'default' | 'active' } = {};

  indicateurServ = inject(IndicateurService);

  /*-------Pagination----------*/
  data: any[] = [];
  currentPage: number = 1; // Starting page number
  rowsPerPage: number = 10; // Rows per page
  totalPages: number = 0;
  errorMessage: string | null = null;



  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService,
      //private indicateurServ: IndicateurService
  ) {}

  displayedColumns: string[] = [
    'id',
    'code',
    'libelle',
    'description',
    'responsable_collecte',
    'statut',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;



  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
     this._getIndicateurList(null);
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }
      /*=================*/
      this.fetchData();
   }

 

  public _getIndicateurList(event?:PageEvent) {
    this.getIndicateurList(event).subscribe({
      next: (res) => {
    
        this.dataSource = new MatTableDataSource(res['responses']);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
    return event;
  }

  getIndicateurList(event: PageEvent): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/indicateur/indicateurList/');
  }

  _updateIndicateur(id) {
    this.router.navigate(['/indicateur/add-edit/'+id]);
  }


  _deleteIndicateur(id){
    var result = confirm("Voulez-vous vraiment supprimmer cette variable ?");
    if(id && result)
    {
        this.deleteIndicateur(id).subscribe({
        next: (res) => {
            this.toastr.info('Suppression effectué avec success!', 'INFO');
            this._getIndicateurList();
        },
        error: console.log,
        });
    }
  }

  deleteIndicateur(id: number): Observable<any> {
    return this._http.delete(`http://154.127.90.218:8000/api/indicateur/indicateur/${id}`);
  }


  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }


  /*--====================================================--*/
  // Fetch data from API based on current page
  fetchData(): void {

    console.log('data : '+ this.data);
    
    const request = {
      filter: {
        pageNumber: this.currentPage,
        rowsPerPage: this.rowsPerPage,
      },
    };

    this.indicateurServ.indicateurList(request).subscribe({
      next: (response) => {
        this.data = response?.data || [];

        console.log('data : '+ this.data);


        this.totalPages = Math.ceil(response.total / this.rowsPerPage);
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching data.';
        console.error('Service error:', error);
      },
    });
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchData();
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchData();
    }
  }

}




