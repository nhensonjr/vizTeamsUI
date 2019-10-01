import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class MaterialModule {
}
