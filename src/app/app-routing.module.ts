import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SellersComponent } from './sellers/sellers.component';
import { SellersDashboardComponent } from './sellers-dashboard/sellers-dashboard.component';
import { LeadsComponent } from './leads/leads.component';
import { AdminComponent } from './admin/admin.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
	{path:'',component:HomeComponent},
	{path:'dashboard',component:DashboardComponent},
	{path:'home',component:HomeComponent},
	{path:'login',component:LoginComponent},
	{path:'sellers/create',component:SellersComponent},
	{path:'sellers/home',component:SellersDashboardComponent},
	{path:'sellers/leads',component:LeadsComponent},
	{path:'admin',component:AdminComponent},
	{path:'admin/create',component:AdminComponent},
	{path:'admin/edit/:id',component:EditFormComponent},
	{path:'admin/preview/:id',component:PreviewComponent},
	{path:'admin/forms',component:AllFormsComponent},
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
