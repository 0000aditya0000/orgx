import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
export interface User {
  created_at: string;
  email: string;
  id: number;
  phone: string;
  role: string;
  status: string;
  tenant_name: string;
  token: string;
  first_name?: string;
  last_name?: string;
  updated_at: string;
  tenant_code?: string;
}

export interface Login {
  message: string,
  user: User
}
interface Payload {
  email: string;
  password: string;
  role?: string;
  tenant_code?: string;
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
  errorMessage: string = '';
  public showPass: boolean;
  isValid: any | null;
  isLoading: boolean = false;
  private readonly destroy: DestroyRef = inject(DestroyRef);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    role: new FormControl(localStorage.getItem('role') || 'employee'),
    tenant_code: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/[a-zA-Z0-9]+/),
      Validators.pattern(/[!@#$%^&*()_+{}|:"<>?]+/),
      Validators.pattern(/[A-Z]+/)
    ]),
   rememberMe:new FormControl(false)
  });

  constructor(private loginService: LoginService, private route: Router, private toastr: ToastrService
  ) {
    this.showPass = false;
  }

  ngOnInit(): void {
    this.initilize()
  }
  
  initilize(){
    const role = this.loginForm.get('role')?.value;
    if (localStorage.getItem('auth')) {
      this.route.navigate(['home'])
    }
    this.loadDataForRole(role);
    this.onRoleChange(role)
  }

  loadDataForRole(role: string): void {
    const savedData = JSON.parse(localStorage.getItem(`credentials_${role}`) || '{}');
    this.loginForm.patchValue({
      email: savedData.email || '',
      tenant_code: savedData.tenant_code || '',
      rememberMe: savedData.rememberMe || false,
    });
  }

  async login() {
    if(this.loginForm.valid){
    this.isLoading = true;
    const formValue = this.loginForm.getRawValue();
    const passwordEncrypted = await this.loginService.encryptPassword(formValue.password, environment.aesSecretKey);
    let payload: Payload = {
      email: formValue.email,
      password: `${passwordEncrypted.iv}:${passwordEncrypted.authTag}:${passwordEncrypted.encrypted}`,
      role: formValue.role,
      tenant_code: formValue.tenant_code 
    };
    if(payload.role === 'super admin') {
      payload.password = formValue.password; // Super admin does not use encrypted password
    }

    if(formValue.role !== 'employee') {
      delete payload.tenant_code;
    }
 
    this.loginService.checkCredentials(payload).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: (res: Login) => {
        if (res.user.token) {
          localStorage.setItem('auth', 'authenticated');
          localStorage.setItem('token', res.user.token);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('tenant_code',  res.user?.tenant_code || '');
          localStorage.setItem('tenant_name', res.user.tenant_name);
          localStorage.setItem('employee_name', res.user?.first_name ?? '' + ' ' + res.user?.last_name ?? '');
          localStorage.setItem('refreshToken', res.user.token);
          localStorage.setItem('id', res.user.id.toString());
          const role = localStorage.getItem('role');
          const { email, tenant_code,  rememberMe } = formValue;
          if (rememberMe) {
            const dataToSave = { email, tenant_code, rememberMe };
            localStorage.setItem(`credentials_${role}`, JSON.stringify(dataToSave));
          } else {
            localStorage.removeItem(`credentials_${role}`);
          }
          if (role === 'super admin') {
            this.route.navigate(['/home/tenant']);
          } else if(role === 'admin'){
            this.route.navigate(['/home', 'company']);
          } else if(role === 'employee') {
            // this.id = res.user.id;
            this.route.navigate(['/home', 'employee-dashboard', `${localStorage.getItem('id')}`]);
          }
 
        
        } else {
 
          localStorage.setItem('auth', 'unauthorized');
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || "Something went wrong";
        this.toastr.error(this.errorMessage); 
        localStorage.setItem('auth', 'unauthorized');
        this.isLoading = false;
      }
    });
 
    this.isValid = localStorage.getItem('auth');
  } else {
    this.loginForm.markAsDirty();
    this.loginForm.markAllAsTouched();
  }
  }

  onRoleChange(role: string) {
    if(this.loginForm.get('tenant_code')){
      if (role !== 'employee') {
        this.loginForm.controls['tenant_code'].setErrors(null)
        this.loginForm.controls['tenant_code'].setValidators(null)
        this.loginForm.updateValueAndValidity();

      } else {
        this.loginForm.controls['tenant_code'].setValidators([Validators.required]);
      }
    }
    this.loadDataForRole(role);
  }
}

