
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListClientComponent } from './list-client/list-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'list-client', component: ListClientComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'edit-client', component: EditClientComponent },
  { path: 'edit-cards', component: EditCardComponent },
  { path: 'list-cards', component: ListCardsComponent },
  { path: 'create-cards', component: CreateCardComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
