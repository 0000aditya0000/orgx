import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef, forwardRef } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../service/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginService: LoginService;
  let router: Router;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule,
              HttpClientTestingModule ],
      providers: [
        LoginService,
        ApiService,
         Router,
        { provide: ToastrService, useValue: { error: jasmine.createSpy('error') } },
        ChangeDetectorRef,
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => LoginPageComponent),
          multi: true,
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
     localStorage.setItem('role','admin')
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call ngOninit', () => {
    component.loginForm.controls['role'].setValue('admin');
    localStorage.setItem('auth','authenticated')
    spyOn(router, 'navigate')
    spyOn(component,'onRoleChange')
    spyOn(component,'loadDataForRole')
    component.initilize()
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call initilize', () => {
    spyOn(component, 'initilize')
    component.ngOnInit()
    expect(component.initilize).toHaveBeenCalled();
  });

  it('should invalidate the form when required fields are empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate the form when required fields are filled', () => {
    component.loginForm.controls['email'].setValue('test@domain.com');
    component.loginForm.controls['password'].setValue('Password@123');
    component.loginForm.controls['role'].setValue('admin');

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should successfully login and navigate when credentials are correct', () => {
    component.loginForm.controls['email'].setValue('test@domain.com');
    component.loginForm.controls['password'].setValue('Password@123');
    component.loginForm.controls['tenant_code'].setValue('tenant-code');
    spyOn(router, 'navigate')
    spyOn(loginService,'checkCredentials').and.returnValues(of({message:'login sucessful',user:{ created_at: 'string',
      email: 'admin@nashtechglobal.com',
      id: 1,
      phone: '0980809890',
      role: 'admin',
      status: 'string',
      tenant_name: 'string',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o',
      updated_at: 'string'}}))
    component.login();
    
    expect(localStorage.getItem('auth')).toEqual('authenticated');
    expect(toastr.error).not.toHaveBeenCalled();
  });

  it('should show tenant code field when role is admin', () => {
    component.loginForm.controls['role'].setValue('admin');
    component.onRoleChange('admin');

    expect(component.loginForm.controls['tenant_code'].valid).toBeFalsy();
  });

  it('should hide tenant code field when role is not admin', () => {
    localStorage.setItem('role','super_admin')
    component.loginForm.controls['role'].setValue('super_admin');
    component.onRoleChange('super_admin');

    expect(component.loginForm.controls['tenant_code'].valid).toBeTruthy();
  });

  it('should load saved data for the role from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({
      email: 'test@domain.com',
      tenant_code: 'tenant-code',
      rememberMe: true,
    }));

    component.loadDataForRole('admin');
    
    expect(component.loginForm.controls['email'].value).toBe('test@domain.com');
    expect(component.loginForm.controls['tenant_code'].value).toBe('tenant-code');
  });

  it('should mark the form as dirty when submitted with invalid data', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.login();
    
    expect(component.loginForm.dirty).toBeTrue();
    expect(component.loginForm.touched).toBeTrue();
  });
});
