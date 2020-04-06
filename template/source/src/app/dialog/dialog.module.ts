import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    // declarations: [DialogComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogModule { }
