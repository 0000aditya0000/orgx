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
  selector: 'app-create-subscription',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule, QuillModule, MatButtonModule, MatCardModule],
  templateUrl: './create-subscription.component.html',
  styleUrl: './create-subscription.component.scss',

})
export class CreateSubscriptionComponent {
  subscriptionForm: FormGroup = new FormGroup({
    planName: new FormControl('', Validators.required),
    numberOfEmployees: new FormControl('', Validators.required),
    planDuration: new FormControl('', Validators.required),
    planDescription: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })
  @Output() submitSuccess = new EventEmitter();
  @Input() modalService!: BsModalService
  showModal: boolean = false;

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
    }
    
  onSubmit() {
    const formValue = this.subscriptionForm.value;
    const payload = {
      planName: formValue.planName,
      numberOfEmployees: formValue.numberOfEmployees,
      planDuration: formValue.planDuration,
      planDescription: formValue.planDescription,
      price: +formValue.price,
      status: 'active'
    };
    if (this.subscriptionForm.valid) {
      this.subscriptionService.postSubscription(payload).subscribe({
        next: (res: any) => {
          this.subscriptionForm.markAllAsTouched();
          this.submitSuccess.emit(true);
          if (res && res.data) {
            this.toastr.success("Subscription created successfully!");
            this.subscriptionForm.reset();
            this.cancelModal()
          } else {
            this.submitSuccess.emit(true);
            this.cancelModal()
            this.errorMessage = res.message;
            this.toastr.error(this.errorMessage);
          }
        },
        error: (err: any) => {
          this.errorMessage = err.message;
          this.toastr.error(this.errorMessage);
        }
      });
    } else {
      this.subscriptionForm.markAllAsTouched();
      this.subscriptionForm.markAsDirty();
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.toastr.error(this.errorMessage);
    }
  }

  cancelModal() {
    this.modalService.hide();
}

}


