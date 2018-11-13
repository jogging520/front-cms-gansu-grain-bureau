import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyListComponent } from './list/list.component';
import {UserResolver} from "@shared/resolvers/general/user.resolver";
import { PolicyCreationComponent } from './creation/creation.component';

const routes: Routes = [

  { path: 'list',
    resolve: {userParams: UserResolver},
    component: PolicyListComponent,
    data: { title: '政策列表' } },
  { path: 'policy-creation', component: PolicyCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
