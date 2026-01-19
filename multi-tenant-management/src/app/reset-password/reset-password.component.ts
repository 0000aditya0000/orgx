import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  token: string;
  isLoading:boolean =false
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private apiService: ApiService, private router: Router,
    private toastr: ToastrService
  ) {
    this.token = this.route.snapshot.params['token'];
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },  { validators: passwordMatchValidator() });
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  get passwordsMatch() {
    return this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmPassword;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.passwordsMatch) {
      const { password } = this.resetPasswordForm.value;
      const newupdatedPassword = { password };
      this.apiService.resetUserPassword(newupdatedPassword).subscribe({
        next: (response: any) => {
          this.toastr.success("Password updated successfully!");
          this.router.navigate(['/home']);
      },
      error: (error: any) => {
          this.toastr.error("Something went wrong");
      }
      })
    }
  }

  navigateToHome(){
    const user = localStorage.getItem('role');
    if(user === 'super admin'){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/home/company']);
    }
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}

