import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellersRoutingModule } from './sellers-routing.module';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { SellersComponent } from './sellers.component';


@NgModule({
  declarations: [SellersComponent],
  imports: [
    CommonModule,
    SellersRoutingModule
  ]
})
export class SellersModule { }
