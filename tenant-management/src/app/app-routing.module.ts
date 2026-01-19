import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { ListSubscriptionsComponent } from './list-subscriptions/list-subscriptions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'list-plans', component: ListSubscriptionsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
