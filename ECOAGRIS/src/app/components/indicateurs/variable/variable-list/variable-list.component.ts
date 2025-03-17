import { NgIf } from '@angular/common';
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
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../common/header/header.component';

@Component({
  selector: 'app-variable-list',
  standalone: true,
  imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatCheckboxModule, 
    MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule, HeaderComponent],
  templateUrl: './variable-list.component.html',
  styleUrl: './variable-list.component.scss',
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
export class VariableListComponent {
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
      private snap: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
  ) {}

  displayedColumns: string[] = [
    'id',
    'code',
    'libelle',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

   ngOnInit(): void {
     this._getVariableList();
      /*===================*/
      for (let index in this.dataSource) {
        this.animationStates[index] = 'default';
      }
   }

   _getVariableList() {
    this.getVariableList().subscribe({
      next: (res) => {
        //this.dataSource = new MatTableDataSource(res['results']);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.toastr.success("Liste des variable chargées avec succés");
      },
      error: console.log,
    });
  }

  getVariableList(): Observable<any> {
    return this._http.get('http://154.127.90.218:8000/api/indicateur/variableList');
  }

  _updateVariable(id) {
    this.router.navigate(['/variable/add-edit/'+id]);
  }

  _deleteVariable(id: number) {

    var result = confirm("Voulez-vous vraiment supprimmer cette variable ?");
    if(id && result)
    {
        this.deleteVariable(id).subscribe({
          next: (res) => {
            this.toastr.info('Suppression effectué avec success!', 'INFO');
            this._getVariableList();
          },
          error: console.log,
        });
    }
    else
    {
      alert(" Donnéee non supprimée ");
    }
  }

  deleteVariable(id: number): Observable<any> {
    return this._http.delete(`http://154.127.90.218:8000/api/indicateur/variable/${id}`);
  }

  /*=====animation=======*/
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
