import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormioModule } from 'angular-formio';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SellersComponent } from './sellers/sellers.component';
import { SellersDashboardComponent } from './sellers-dashboard/sellers-dashboard.component';
import { LeadsComponent } from './leads/leads.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PreviewComponent } from './preview/preview.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
	SellersComponent,
	SellersDashboardComponent,
	LeadsComponent,
	HeaderComponent,
	AdminComponent,
	AllFormsComponent,
	EditFormComponent,
	PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormioModule,
	HttpClientModule,
	FormsModule,
	CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
