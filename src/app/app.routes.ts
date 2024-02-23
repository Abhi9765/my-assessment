import { Routes } from '@angular/router';
export const routes: Routes = [
    {'path':'home',loadComponent:()=>import('./home/home.component').then((c)=>c.HomeComponent)},
    {'path':'',redirectTo:'home',pathMatch:'full'},
    {'path':'dashboard',loadComponent:()=>import('./dashboard/dashboard.component').then((c)=>c.DashboardComponent)},
    {'path':'form',loadComponent:()=>import('./dashboard/form/form.component').then((c)=>c.FormComponent)}
];
