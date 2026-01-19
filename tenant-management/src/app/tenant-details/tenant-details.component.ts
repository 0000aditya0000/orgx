import { Component, Input } from '@angular/core';
import { TenantService } from '../service/tenant.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrl: './tenant-details.component.scss',
})
export class TenantDetailsComponent {
  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    tenant_email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl({ value: '', disabled: true }),
    status: new FormControl({ value: '', disabled: true }, Validators.required),
    subscription_details: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    location: new FormControl({ value: '', disabled: true }),
    id: new FormControl({ value: '', disabled: true }),
    password: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  @Input() rowdata: any;
  @Input() modalService!: BsModalService;
  subscriptionPlans: SubscriptionPlan[] = [];
  modalRef: BsModalRef | undefined;
  showModal: boolean = false;

  constructor(private TenantService: TenantService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showModal = true;
    }, 400);
    this.editForm();
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
    this.createTenantForm.patchValue(this.rowdata);
  }

  cancel() {
    this.modalService?.hide();
  }
}