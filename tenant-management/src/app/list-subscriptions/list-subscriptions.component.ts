import { Component, OnInit, TemplateRef } from '@angular/core';
import { TenantService } from '../service/tenant.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SubscriptionPlan } from '../interface/subscription-plan.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateSubscriptionComponent } from '../create-subscription/create-subscription.component';
import { EditSubscriptionComponent } from '../edit-subscription/edit-subscription.component';

@Component({
  selector: 'app-list-subscriptions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule,CreateSubscriptionComponent, EditSubscriptionComponent],
  templateUrl: './list-subscriptions.component.html',
  styleUrl: './list-subscriptions.component.scss'
})
export class ListSubscriptionsComponent implements OnInit{
  subscriptionPlans: SubscriptionPlan[] = [];
  modalRef: BsModalRef | undefined;
  selectedPlan: any = null

  constructor(private tenantService: TenantService,
    public modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.fetchSubscriptionPlans();
  }

  openEditModal(plan: any) {
    this.selectedPlan = plan;
    const modalRef = this.modalService.show(EditSubscriptionComponent, {
      initialState: {
        modalService: this.modalService,
        planData: this.selectedPlan
      }
    });
    const contentComponent = modalRef.content as EditSubscriptionComponent;
    if (contentComponent && contentComponent.submitSuccess) {
      contentComponent.submitSuccess.subscribe((updated: boolean) => {
        if (updated) {
          this.fetchSubscriptionPlans();
        }
      });
    }
}

  fetchSubscriptionPlans() {
    this.tenantService.getSubscription().subscribe((response) => {
      if(response?.data?.length)
      this.subscriptionPlans = response.data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      initialState: {},
      class: "modal-dialog-centered modal-lg",
      backdrop: "static",
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    });
  }

  submit(event: boolean) {
    if (event) {
      this.fetchSubscriptionPlans();
    }
  }

}
