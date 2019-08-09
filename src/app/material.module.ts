import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatTableModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
