import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserMainComponent } from './user-main/user-main.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [UserMainComponent, UserCreateComponent, UserEditComponent, UserDetailComponent, UserListComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class UsersModule { }
