import { BuyingComponent } from './buying/buying.component';
import { GroupBuyComponent } from './group-buy/group-buy.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: '', children: [] },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'groupbuy', component: GroupBuyComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'buying/:id', component: BuyingComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
