import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'team-list', pathMatch: 'full'},
  {path: 'team-list', component: TeamListComponent},
  {path: 'team/:id', component: TeamDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
