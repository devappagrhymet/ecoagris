import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FrequenceAddEditComponent } from '../../frequence/frequence-add-edit/frequence-add-edit.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../common/header/header.component';

@Component({
  selector: 'app-divadmin-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, MatTableModule, MatCheckboxModule,
     MatPaginatorModule, MatTooltipModule, NgIf, HttpClientModule, HeaderComponent],
  templateUrl: './divadmin-list.component.html',
  styleUrl: './divadmin-list.component.scss',
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
export class DivadminListComponent {
  animationStates: { [key: number]: 'default' | 'active' } = {};
  
  constructor(
      public dialog: MatDialog,
      private _http: HttpClient,
  ) {}
  
  openAddTaskDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(FrequenceAddEditComponent, {
          width: '600px',
          enterAnimationDuration,
          exitAnimationDuration
      });
  }
  
  displayedColumns: string[] = ['id', 'codeDivision', 'nomDivision','niveauDivision','libelleNiveauDivision','image', 'action'];
  
  
  dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit() {
      //this.dataSource.paginator = this.paginator;
    }
  
     ngOnInit(): void {
       this._getDivadminList();
        /*===================*/
        for (let index in this.dataSource) {
          this.animationStates[index] = 'default';
        }
     }
  
   
  
    _getDivadminList() {
      this.getDivadminList().subscribe({
        next: (res) => {
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });
    }
  
    getDivadminList(): Observable<any> {
      return this._http.get('http://154.127.90.218:8000/api/divadmin/divisionsAdministratives/');
    }
  
}
