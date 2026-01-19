import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { MainComponent } from './main/main.component';
import { SuperAdminAuthGuard } from './service/super-admin-auth.guard';
import { CompanyGuard } from './service/company.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: "Admin Login" },
  },

  { path: 'registration', component: RegistrationPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },



  {
    path: 'home',
    component: MainComponent,
    canActivate: [CompanyGuard],
    children: [{
      path: 'tenant',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: environment.remoteEntryForTenantManagement,
          exposedModule: './tenant-management'
        })
          .then((m: any) => m.AppModule),
      canActivate: [SuperAdminAuthGuard],
    },
    {
      path: 'company',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'employee-dashboard/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'competency-dashboard',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'competency-dashboard/projectStatistics',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/subscription',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'competency-dashboard/projectStatistics/projects/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'profile',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'leave',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/studio',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/studioprofile/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    }
      , {
      path: 'company/employee',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'studiohead-dashboard',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/employee/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'profile',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'profile/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'profile/:id/attendance',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/about',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/practices',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/practices/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/projects',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/projects/projectStatistics/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/projects/add-project',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'company/projects/edit-project/:id',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'contact-us',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: environment.remoteEntryForCompanyManagement,
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },
    {
      path: 'reset-password',
      component:ResetPasswordComponent
    }
  ]
  },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


