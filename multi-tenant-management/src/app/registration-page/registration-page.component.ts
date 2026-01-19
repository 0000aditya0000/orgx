import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatRadioButton } from '@angular/material/radio';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';
import { ApiService } from '../service/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    MatRadioButton,
    MatAutocompleteTrigger,
    MatStepperModule,
    MatIconModule,
    MatRadioModule
  ]
})
export class RegistrationPageComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  registrationForm: FormGroup;
  subscriptionPlans: SubscriptionPlan[] = [];
  selectedSubscription: any;
  selectedSubscriptionPriceWithGST: number | undefined;
  showPass: boolean = false;
  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      status: ['Active', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      // aboutCompany: ['', [Validators.required, Validators.maxLength(500)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchSubscriptionPlans();
  }

  fetchSubscriptionPlans() {
    this.apiService.getSubscription().pipe( 
      takeUntilDestroyed(this.destroy)).subscribe(
      (response: { data: SubscriptionPlan[] }) => {
        this.subscriptionPlans = response.data;
      },
      (error: any) => {
        console.error('Failed to fetch subscription plans:', error);
        this.subscriptionPlans = [];
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid && this.selectedSubscription) {
      const formValue = this.registrationForm.value;
      const payload = {
        tenant_name: formValue.companyName,
        tenant_email: formValue.email,
        password: formValue.password,
        role: 'admin',
        status: formValue.status,
        phone: formValue.phone,
        location: formValue.location,
        subscription_details: this.selectedSubscription.planName
      };

      this.apiService.registerTenant(payload).pipe( 
        takeUntilDestroyed(this.destroy)).subscribe({
        next: (response: any) => {
          if(response?.data?.isRegistered){
            this.toastr.success(response.message);
            this.registrationForm.reset();
            this.router.navigate(['/login']);
          } else{
            this.toastr.error(response.message || 'Registration failed. Please try again.');
          }
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          this.toastr.error('Registration failed. Please try again.');
        }
      });
    }
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registrationForm.get('password');

    if (passwordControl!.hasError('required')) {
      return 'Password is required';
    } else if (passwordControl!.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    } else if (passwordControl!.hasError('pattern')) {
      return 'Password must contain a special character, an uppercase letter, and a number';
    }

    return '';
  }

  sanitizeDescription(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onPlanSelect(plan: SubscriptionPlan) {
    if (this.selectedSubscription?.planName === plan.planName) {
      this.selectedSubscription = null;
    } else {
      this.selectedSubscription = plan;
      this.selectedSubscriptionPriceWithGST = plan.price * 1;
    }
  }

  goToNextStep() {
    // this.fetchSubscriptionPlans()
    if (this.stepper) {
      this.stepper.next();
    }
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }

  goToPreviousStep() {
    if (this.stepper) {
      this.stepper.previous();
    }
  }

  formatPrice(price: number): string {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(1)}k`;
    }
    return `₹${price}`;
  }
}
