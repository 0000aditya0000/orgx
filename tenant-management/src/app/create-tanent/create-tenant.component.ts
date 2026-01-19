import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../service/tenant.service';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';
@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss'],
})
export class CreateTenantComponent implements OnInit {
  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    tenant_email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.minLength(10)),
    status: new FormControl('', Validators.required),
    subscription_details: new FormControl('', Validators.required),
    location: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
    ]),
  });

  @Input() rowdata: any;
  @Input() modalService!: BsModalService;
  @Output() submitSuccess = new EventEmitter();
  subscriptionPlans: SubscriptionPlan[] = [];
  hide: boolean = true;
  editMode: boolean = false;
  showModal: boolean = false;

  constructor(
    private TenantService: TenantService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.showModal = true;
    }, 400);
    if (this.rowdata?.id) {
      this.editMode = true;
      this.editForm();
    } else {
      this.editMode = false;
    }
    this.fetchSubscriptionPlans();
  }

  fetchSubscriptionPlans() {
    this.TenantService.getSubscription().subscribe(
      (response: { data: SubscriptionPlan[] }) => {
        this.subscriptionPlans = response.data;
      },
      (error) => {
        console.error('Failed to fetch subscription plans:', error);
        this.subscriptionPlans = [];
      }
    );
  }

  editForm() {
    this.createTenantForm.get('password')?.clearValidators();
    this.createTenantForm.get('password')?.updateValueAndValidity();
    this.createTenantForm.patchValue(this.rowdata);
  }

  onSubmit() {
    const formValue = this.createTenantForm.value;
    const tenantCode = this.generateTenantCode();
    const payload = {
      ...formValue,
      role: 'admin',
      status: formValue.status.toLowerCase(),
      phone: formValue.phone?.toString()
    };

    if (this.createTenantForm.valid) {
      if (this.rowdata?.id) {
        this.TenantService.updateTenantById(
          payload,
          this.rowdata?.id
        ).subscribe({
          next: (res: any) => {
            this.createTenantForm.reset();
            this.cancelModal();
            this.submitSuccess.emit(true);
            this.toastr.success('Tenant Updated successfully!');
          },
          error: (error: any) => {
            this.toastr.error('Something went wrong');
          },
        });
      } else {
        payload.tenant_code = tenantCode,
        this.TenantService.postTenant(payload).subscribe({
          next: (res: any) => {
            this.createTenantForm.markAllAsTouched();
            this.createTenantForm.reset();
            this.cancelModal();
            this.submitSuccess.emit(true);
            this.toastr.success('Tenant created successfully!');
          },
          error: (error: any) => {
            this.toastr.error('Something went wrong');
          },
        });
      }
    }
  }

  generateTenantCode(): string {
    if (typeof window.crypto?.randomUUID === 'function') {
      return window.crypto.randomUUID().toString().substring(0, 4);
    } else {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }
  }

  cancelModal() {
    this.modalService.hide();
  }
}
