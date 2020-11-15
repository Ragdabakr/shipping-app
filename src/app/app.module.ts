import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalModule, BsModalService} from 'ngx-bootstrap/modal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import { ToastrModule } from 'ngx-toastr';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ZingchartAngularModule } from 'zingchart-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import container
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { ChangePasswordComponent } from './views/change-password/change-password.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import {AuthInterceptor} from '../shared/auth.interceptor';
import { AuthGuardService } from '../shared/auth-guard.service';
import { UsersModule } from './views/users/users.module';
import { CustomerComponent } from './views/customer/customer.component';


// import { CustomerModule } from './views/customer/customer.module';
import {  FileUploadModule } from 'ng2-file-upload';
import { SupplierComponent } from './views//supplier/supplier.component';

import { ProfileComponent } from './views/profile/profile.component';
import { CustomerOrdersComponent } from './views/customer-orders/customer-orders.component';
import { CustomerOrdersDetailsComponent } from './views/customer-orders-details/customer-orders-details.component';
import { SupplierOrdersComponent } from './views/supplier-orders/supplier-orders.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TableModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    DialogModule,
    UsersModule,
    ToolbarModule,
    FileUploadModule,
    ZingchartAngularModule,
    NgSelectModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    CustomerComponent,
    ProfileComponent,
    CustomerOrdersComponent,
    CustomerOrdersDetailsComponent,
    SupplierComponent,
    SupplierOrdersComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    AuthGuardService,
],
  bootstrap: [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
