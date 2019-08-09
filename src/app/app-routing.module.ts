import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { CombinedViewComponent } from './components/combined-view/combined-view.component';


const routes: Routes = [
  {path: '', redirectTo: 'combined-view', pathMatch: 'full'},
  {path: 'combined-view', component: CombinedViewComponent},
  {path: 'team-list', component: TeamListComponent},
  {path: 'team/:id', component: TeamDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
