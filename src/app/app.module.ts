import { AuthService } from './auth.service';
import { FirebService } from './fireb.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { GroupBuyComponent } from './group-buy/group-buy.component';
import { GroupBuyAddComponent } from './group-buy/group-buy-add/group-buy-add.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BuyingComponent } from './buying/buying.component';
import { LineFeedPipe } from './line-feed.pipe';
import { StrLimitPipe } from './str-limit.pipe';
import { GroupBuyEditComponent } from './group-buy/group-buy-edit/group-buy-edit.component';
import { GroupBuyProductComponent } from './group-buy/group-buy-product/group-buy-product.component';
import { ProductListComponent } from './buying/product-list/product-list.component';
import { BuyingListComponent } from './buying/buying-list/buying-list.component';
import { DiscussComponent } from './buying/discuss/discuss.component';
import { MessagePipe } from './message.pipe';

export const firebaseconfig = {
  apiKey: "AIzaSyDeAfdhyv6_7MS9SizV6mZvXEDkhu1IUbA",
  authDomain: "fbtempalte.firebaseapp.com",
  databaseURL: "https://fbtempalte.firebaseio.com",
  storageBucket: "fbtempalte.appspot.com",
  messagingSenderId: "376954943498"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserprofileComponent,
    GroupBuyComponent,
    GroupBuyAddComponent,
    BuyingComponent,
    LineFeedPipe,
    StrLimitPipe,
    GroupBuyEditComponent,
    GroupBuyProductComponent,
    ProductListComponent,
    BuyingListComponent,
    DiscussComponent,
    MessagePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseconfig, {
      // provider: AuthProviders.Google,
      // method: AuthMethods.Popup
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }),
    Ng2Bs3ModalModule
  ],
  providers: [
    FirebService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
