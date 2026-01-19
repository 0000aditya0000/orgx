import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Subscription, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  expireTime: number = 0;
  timerSubscription$: Subscription | undefined;

  constructor(private router: Router, private apiService: ApiService) { }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  checkCredentials(event: any) {
    return this.apiService.postData(event)
  }

  setIntervalForRefresh() {
    if (this.timerSubscription$) {
      this.timerSubscription$.unsubscribe();
    }
    this.timerSubscription$ =  timer(this.expireTime - 1000).subscribe(() => {
        this.refreshToken();
      });
     
  }


  refreshToken() {
    const token:string = localStorage.getItem('token') || ''; ;
    this.apiService.postRefresh({
      refreshToken: token
    }).subscribe({
      next:(res: { token:string}) => {
        if (res.token) {  
          localStorage.setItem('token', res.token);
          this.expireTime = this.parseJwt(res.token).exp * 1000 - Date.now();
          this.setIntervalForRefresh();
        }
      },
      error:(err: any) => {
        console.log(err);
        this.logout();
      }
      }
    );
  }


  logout() {
    if(this.timerSubscription$) {
      this.timerSubscription$.unsubscribe();
    }
    this.router.navigate(['/login'])
    localStorage.setItem('auth', '');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tenant_code')
    localStorage.removeItem('tenant_name');
  }


 async encryptPassword(password: string, base64Key: string) {
 
  const keyBytes = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(password);
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encoded
  );

  // 5. Split encrypted buffer into ciphertext + authTag
  const encryptedBytes = new Uint8Array(encryptedBuffer);
  const authTagLength = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLength);
  const authTag = encryptedBytes.slice(-authTagLength);

  // 6. Return Base64 encoded parts
  return {
    encrypted: btoa(String.fromCharCode(...ciphertext)),
    iv: btoa(String.fromCharCode(...iv)),
    authTag: btoa(String.fromCharCode(...authTag)),
  };
}

}
