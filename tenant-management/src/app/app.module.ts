import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreateTenantComponent } from './create-tanent/create-tenant.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatMenuModule} from '@angular/material/menu';

import { QuillModule } from 'ngx-quill';
import { MatChipsModule } from '@angular/material/chips';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   CreateTenantComponent,
   TenantDetailsComponent
  //  WebButton,
  ],
  imports: [
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
    }),  ],
schemas:[CUSTOM_ELEMENTS_SCHEMA],
providers: [ BsModalService, BsModalRef, ToastrService,],
 bootstrap: [AppComponent],
})
export class AppModule { }
