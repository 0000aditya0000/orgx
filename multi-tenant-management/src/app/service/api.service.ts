import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Login } from '../login-page/login-page.component';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders()

  private login = `${environment.api.baseUrl}${environment.api.routes.login.endpoint}`;
  private refresh = `${environment.api.baseUrl}${environment.api.routes.refresh.endpoint}`;
  private getsubscription = `${environment.api.baseUrl}${environment.api.routes.getSubscription.endpoint}`;
  private userPassword = `${environment.api.baseUrl}${environment.api.routes.resetPassword.endpoint}`;
  private forgotPassword = `${environment.api.baseUrl}${environment.api.routes.forgotPassword.endpoint}`;
  private register = `${environment.api.baseUrl}${environment.api.routes.register.endpoint}`;

  constructor(private httpClient: HttpClient) { }

  getSubscription(): Observable<{ data: SubscriptionPlan[] }> {
    return this.httpClient.get<{ data: SubscriptionPlan[] }>(this.getsubscription);
  }

  postData(data: string) {
    return this.httpClient.post<Login>(this.login, data);

  }

  postRefresh(data: { refreshToken: string }): Observable<{token: string}> {
    return this.httpClient.post<{token:string}>(this.refresh, data);
  }

  resetUserPassword(data: any){
    return this.httpClient.patch<any>(this.userPassword, data);
  }

  forgotUserPassword(data: any){
    return this.httpClient.post<any>(this.forgotPassword, data);
  }
  registerTenant(payload: any) {
    return this.httpClient.post(this.register, payload);
  }
}
