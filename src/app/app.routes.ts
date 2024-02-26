import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {'path':'home',loadComponent:()=>import('./home/home.component').then((c)=>c.HomeComponent)},
    {'path':'',redirectTo:'home',pathMatch:'full'},
    {'path':'dashboard',loadComponent:()=>import('./dashboard/dashboard.component').then((c)=>c.DashboardComponent),
    canActivate:[authGuard]},
    {'path':'form',loadComponent:()=>import('./dashboard/form/form.component').then((c)=>c.FormComponent)}
];
