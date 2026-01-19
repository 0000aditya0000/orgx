import { NgModule } from '@angular/core';

import { AppModule} from './app.module';
import { AppComponent } from './app.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'

@NgModule({
  imports: [
    AppModule,
    ToastrModule.forRoot({"positionClass": "toast-top-center"})
  ],
  providers:[ToastrService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
