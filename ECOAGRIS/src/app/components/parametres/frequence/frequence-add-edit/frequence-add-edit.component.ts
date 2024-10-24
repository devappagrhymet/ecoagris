import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-frequence-add-edit',
  standalone: true,
  imports: [],
  templateUrl: './frequence-add-edit.component.html',
  styleUrl: './frequence-add-edit.component.scss'
})
export class FrequenceAddEditComponent {
  constructor(
    public dialogRef: MatDialogRef<FrequenceAddEditComponent>
) {}

close(){
    this.dialogRef.close(true);
}
}
