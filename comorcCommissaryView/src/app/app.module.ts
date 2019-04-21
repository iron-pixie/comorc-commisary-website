import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdComponentsModule} from './modules/md-components.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComissaryHomeComponent } from './comissary-home/comissary-home.component';
import { LoginComponent } from './login/login.component';
import { LoggedInControllerComponent } from './logged-in-controller/logged-in-controller.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { IndividualRecordComponent } from './individual-record/individual-record.component'

@NgModule({
  declarations: [
    AppComponent,
    ComissaryHomeComponent,
    LoginComponent,
    LoggedInControllerComponent,
    ItemManagerComponent,
    AddItemComponent,
    AddAccountComponent,
    OrderManagerComponent,
    IndividualRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '',component: LoginComponent},
      {path: 'web', component:LoggedInControllerComponent, children:[
        {path: 'home',component: ComissaryHomeComponent},
        {path: 'itemManager',component: ItemManagerComponent},
        {path: 'addItem',component: AddItemComponent},
        {path: 'orderManager',component: OrderManagerComponent},
        {path: 'accountManager',component: AddAccountComponent},
        {path: 'record/:id',component: IndividualRecordComponent}
      ]},
      {path:"**",redirectTo:""}
    ]),
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
