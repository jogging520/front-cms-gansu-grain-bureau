import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: PolicyListComponent, data: { title: '政策列表' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
