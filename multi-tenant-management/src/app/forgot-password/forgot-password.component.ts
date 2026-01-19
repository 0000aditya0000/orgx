import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  role!: string | null;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.role = this.route.snapshot.queryParamMap.get('role');
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      tenant_code: [''],
    });
  }

  ngOnInit() {
    if (this.role === 'employee') {
      this.forgotPasswordForm
        .get('forgotPasswordForm')
        ?.addValidators(Validators.required);
      this.forgotPasswordForm
        .get('forgotPasswordForm')
        ?.updateValueAndValidity();
    }
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get tenantCode() {
    return this.forgotPasswordForm.get('tenant-code');
  }

  onSubmit() {
    this.isLoading = true;
    if (this.forgotPasswordForm.valid) {
      const payload = this.forgotPasswordForm.value;
      this.apiService.forgotUserPassword(payload).subscribe(
        (res) => {
          this.toastr.success("Mail has been sent on your email address with new Password.");
          this.isLoading = false;
          this.router.navigate(['/login']);

        },
        (message: any) => {
          this.errorMessage = message.error.message || 'Something went wrong';
          this.toastr.error(this.errorMessage);
          localStorage.setItem('auth', 'unauthorized');
          this.isLoading = false;
        }
      );
    }
  }
}
