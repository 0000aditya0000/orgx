import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private httpClient: HttpClient) { }

  private postsubscription = `${environment.api.baseUrl}${environment.api.routes.createSubscription.endpoint}`;
  private upadtesubscription = `${environment.api.baseUrl}${environment.api.routes.updateSubscription.endpoint}`;

  postSubscription(subscriptionData: any) {
    return this.httpClient.post(this.postsubscription, subscriptionData);
  }

  updateSubscriptionById(subscriptionData: any,  id: string) {
    return this.httpClient.put(this.upadtesubscription + '/' + id, subscriptionData);
  }
}

