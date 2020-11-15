import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'لوحة التحكم',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'الاقسام',
  },
  {
    name: 'المستخدمين',
    url: '/users',
    icon: 'icon-user'
  },
  {

    name: 'العملاء',
    url: '/customer',
    icon: 'icon-people'
  },
  {

    name: 'الموردين',
    url: '/supplier',
    icon: 'icon-user'
  },  {
    title: true,
    name: 'ملفي',
  },
  {
    name: 'الملف الشخصي',
    url: '/profile',
    icon: 'icon-login'
  },
  {
    name: 'تغير كلمة المرور',
    url: '/password/change',
    icon: 'icon-wrench'
  },

  {
    title: true,
    name: 'الطلبات',
  },
  {
    name: 'طلبات العملاء',
    url: '/customers/orders',
    icon: 'icon-basket'
  },
  {
    name: 'طلبات الموردين',
    url: '/suppliers/orders',
    icon: 'icon-basket'
  },



];
