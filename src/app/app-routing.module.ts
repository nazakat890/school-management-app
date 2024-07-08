import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path:'', redirectTo:'/auth/login', pathMatch:'full' },
  { path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path:'um', loadChildren: () => import('./um/um.module').then(m => m.UmModule)}
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
