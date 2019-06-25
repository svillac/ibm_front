import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuComponent } from './menu/menu.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { ListHistoryComponent } from './list-history/list-history.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { NgXCreditCardsModule } from 'ngx-credit-cards';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    CreateClientComponent,
    ListClientComponent,
    ListCardsComponent,
    CreateCardComponent,
    ListHistoryComponent,
    EditClientComponent,
    EditCardComponent,
    ListProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    CreditCardDirectivesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
