import { Inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';import { Component } from '@angular/core';


@Component({
  selector: 'confirmation-dialog',
  templateUrl: "./delete.component.html",
  standalone:true,
  imports:[MatButtonModule]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number,name:string}
  ) {}

  confirmDeletion(): void {
    this.dialogRef.close(true);
  }

  cancelDeletion(): void {
    this.dialogRef.close(false); 
  }
}
