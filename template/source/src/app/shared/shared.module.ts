import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DialogComponent } from '../dialog/dialog/dialog.component';



@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    DialogComponent,
    MatIconModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
