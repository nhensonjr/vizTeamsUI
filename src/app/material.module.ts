import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,

  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,

  ]
})
export class MaterialModule {
}
