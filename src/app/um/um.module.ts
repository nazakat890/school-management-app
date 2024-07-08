import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { UmRoutingModule } from './um-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    RoleComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    UmRoutingModule,
    ReactiveFormsModule
  ]
})
export class UmModule { }
