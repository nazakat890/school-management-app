import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';


const routes: Routes = [
  { path:'users', component:UserComponent },
  { path:'roles', component:RoleComponent },
  { path:'permissions', component: PermissionComponent }
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes) ],
  exports:[ RouterModule ]
})
export class UmRoutingModule { }
