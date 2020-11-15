
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UsersComponent } from './views/users/users.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import {
  AuthGuardService as AuthGuard
} from '../shared/auth-guard.service';
import { CustomerComponent } from './views/customer/customer.component';
import {AuthGuardService} from '../shared/auth-guard.service';
import { ProfileComponent } from './views/profile/profile.component';
import { CustomerOrdersComponent } from './views/customer-orders/customer-orders.component';
import { CustomerOrdersDetailsComponent } from './views/customer-orders-details/customer-orders-details.component';
import { SupplierComponent } from './views/supplier/supplier.component';
import { SupplierOrdersComponent } from './views/supplier-orders/supplier-orders.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'رابط استعادة كلمة المرور'
    }
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    data: {
      title: 'استعادة كلمة المرور'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'الرئيسية'
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'users',component: UsersComponent,data: {title: 'المستخدمين'}, canActivate:[AuthGuardService]
      },
      {
         path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'الملف الشخصي'
        },
      },
      {
        path: 'password/change',
        component: ChangePasswordComponent,
        data: {
          title: 'تغيير كلمة المرور'
        },
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'العملاء'
        },
      },
      {
        path: 'customers/orders',
        component: CustomerOrdersComponent,
        data: {
          title: 'طلبات العملاء '
        },
      },
      {
        path: 'suppliers/orders',
        component: SupplierOrdersComponent,
        data: {
          title: 'طلبات الموردين'
        },
      },

    {
        path: 'supplier',
        component: SupplierComponent,
        data: {
          title: 'الموردين'
        },
      },

      {
        path: 'customer/photo/upload',
        component: CustomerComponent,
        data: {
          title: 'Customer'
        },
      }
    ],
  },
  { path: '**', component: P404Component }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
