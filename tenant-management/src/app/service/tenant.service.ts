import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  

  private createTenant = `${environment.api.baseUrl}${environment.api.routes.createTenant.endpoint}`;
  private getTenantUrl = `${environment.api.baseUrl}${environment.api.routes.getTenant.endpoint}`;
  private updateTenant = `${environment.api.baseUrl}${environment.api.routes.updateTenant.endpoint}`;
  private deleteTenant = `${environment.api.baseUrl}${environment.api.routes.deleteTenant.endpoint}`;
  private getsubscription = `${environment.api.baseUrl}${environment.api.routes.getSubscription.endpoint}`;
  accessToken: string | null;
  headers: HttpHeaders;


constructor(private httpClient:HttpClient) { 
  this.accessToken = localStorage.getItem('token')
   this.headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set("Authorization", `Bearer ${this.accessToken}`)

}

getSubscription(): Observable<{ data: SubscriptionPlan[] }> {
  return this.httpClient.get<{ data: SubscriptionPlan[] }>(this.getsubscription, { headers: this.headers });
}

getTenant():Observable<any> {
  return this.httpClient.get<any>(this.getTenantUrl,{'headers':this.headers});
}

getTenantById(id: string) {
  return this.httpClient.get(this.getTenantUrl +id,{'headers':this.headers});
}

postTenant(data: any) {
  return this.httpClient.post(this.createTenant, data,{'headers':this.headers});
}

updateTenantById(data: any, id: string) {

  return this.httpClient.patch(this.updateTenant + id, data,{'headers':this.headers})
}

deleteTenantById(id: number) {
  return this.httpClient.patch(this.deleteTenant + id,'',{'headers':this.headers});
}
}
