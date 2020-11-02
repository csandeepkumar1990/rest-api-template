import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from './user-main/user-main.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';


const routes: Routes = [
  {
    path: '',
    component: UserMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'usersList',
        pathMatch: 'full'
      },
      {
        path: 'usersList',
        component: UserListComponent
      },
      {
        path: 'createUser',
        component: UserCreateComponent
      },
      {
        path: 'userDetail',
        component: UserDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
