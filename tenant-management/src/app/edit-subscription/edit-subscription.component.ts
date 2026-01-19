import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { SubscriptionService } from '../service/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-subscription',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule, QuillModule, MatButtonModule, MatCardModule],
  templateUrl: './edit-subscription.component.html',
  styleUrl: './edit-subscription.component.scss'
})
export class EditSubscriptionComponent {
 subscriptionForm: FormGroup = new FormGroup({
    planName: new FormControl('', Validators.required),
    numberOfEmployees: new FormControl('', Validators.required),
    planDuration: new FormControl('', Validators.required),
    planDescription: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })
  @Output() submitSuccess = new EventEmitter();
  @Input() modalService!: BsModalService;
  showModal: boolean = false;
  @Input() planData: any;

  errorMessage: string = '';

   modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private toastr: ToastrService,
    private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showModal = true;
    }, 400);
    if (this.planData) {
      this.subscriptionForm.patchValue({
        planName: this.planData.planName,
        numberOfEmployees: this.planData.numberOfEmployees,
        planDuration: this.planData.planDuration,
        planDescription: this.planData.planDescription,
        price: this.planData.price
      });
    }
  }
    
  onSubmit() {
    if (this.subscriptionForm.invalid) {
      this.subscriptionForm.markAllAsTouched();
      this.subscriptionForm.markAsDirty();
      this.toastr.error('Please fill out all required fields correctly.');
      return;
    }

    const formValue = this.subscriptionForm.value;
    const payload = {
      planName: formValue.planName,
      numberOfEmployees: formValue.numberOfEmployees,
      planDuration: formValue.planDuration,
      planDescription: formValue.planDescription,
      price: +formValue.price,
      status: 'active'
    };

    const id = this.planData?.id;
    if (!id) {
      this.toastr.error('Subscription ID is missing.');
      return;
    }

    this.subscriptionService.updateSubscriptionById(payload, id).subscribe({
      next: (res: any) => {
        this.submitSuccess.emit(true);
        if (res && res.data) {
          this.toastr.success("Subscription updated successfully!");
        } else {
          this.toastr.warning(res.message || "Update may not have succeeded.");
        }
        this.submitSuccess.emit(true); 
        this.subscriptionForm.reset();
        this.cancelModal();
      },
      error: (err: any) => {
        this.errorMessage = err.message;
        this.toastr.error(this.errorMessage);
      }
    });
  }

  cancelModal() {
    this.modalService.hide();
}
}
