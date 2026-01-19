import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPageComponent } from './registration-page.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { of, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
        ],
      providers: [FormBuilder, ApiService, Router, DomSanitizer]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should initialize the component and fetch subscription plans', () => {
    const mockPlans: SubscriptionPlan[] = [
      {
        planName: 'Basic', price: 100,
        onPlanSelect: undefined,
        name: undefined,
        id: 0,
        numberOfEmployees: 0,
        planDuration: '',
        planDescription: '',
        status: ''
      },
      {
        planName: 'Pro', price: 200,
        onPlanSelect: undefined,
        name: undefined,
        id: 0,
        numberOfEmployees: 0,
        planDuration: '',
        planDescription: '',
        status: ''
      }
    ];

    spyOn(apiService, 'getSubscription').and.returnValue(of({ data: mockPlans }));

    component.ngOnInit();

    expect(component.subscriptionPlans.length).toBe(2);
    expect(component.subscriptionPlans[0].planName).toBe('Basic');
  });

  it('should validate the form and prevent submission if invalid', () => {
    component.registrationForm.controls['companyName'].setValue('Company ABC');
    component.registrationForm.controls['email'].setValue('test@domain.com');
    component.registrationForm.controls['companySize'].setValue('Small');
    component.registrationForm.controls['password'].setValue('Password@123');
    component.registrationForm.controls['aboutCompany'].setValue('Valid description');
    component.registrationForm.controls['location'].setValue('City');

    component.onSubmit();
    
    expect(component.registrationForm.valid).toBe(false);
    expect(component.submitted).toBe(false);
  });

  it('should return appropriate password error messages', () => {
    const passwordControl = component.registrationForm.get('password');

    passwordControl?.setValue('');
    expect(component.getPasswordErrorMessage()).toBe('Password is required');

    passwordControl?.setValue('short');
    expect(component.getPasswordErrorMessage()).toBe('Password must be at least 8 characters long');

    passwordControl?.setValue('NoSpecial123');
    expect(component.getPasswordErrorMessage()).toBe('Password must contain a special character, an uppercase letter, and a number');
  });

  it('should select and deselect subscription plans correctly', () => {
    const plan = {  planName: 'Pro', price: 200,
      onPlanSelect: undefined,
      name: undefined,
      id: 0,
      numberOfEmployees: 0,
      planDuration: '',
      planDescription: '',
      status: '' };

    component.onPlanSelect(plan);

    expect(component.selectedSubscription.planName).toBe('Pro');
    expect(component.selectedSubscriptionPriceWithGST).toBe(200);

    component.onPlanSelect(plan);
    expect(component.selectedSubscription).toBeNull();
  });

  it('should submit the form and reset when valid', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.registrationForm.controls['companyName'].setValue('Company ABC');
    component.registrationForm.controls['email'].setValue('test@domain.com');
    component.registrationForm.controls['companySize'].setValue('Small');
    component.registrationForm.controls['password'].setValue('Password@123');
    component.registrationForm.controls['aboutCompany'].setValue('This is a valid description.');
    component.registrationForm.controls['location'].setValue('City');

    component.onSubmit();

    expect(component.registrationForm.controls['companyName'].value).toBe(null);
  });

  it('should handle error when fetching subscription plans', () => {
    spyOn(apiService, 'getSubscription').and.returnValue(throwError('API Error'));

    component.ngOnInit();

    expect(component.subscriptionPlans.length).toBe(0);
  });
});
