import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Events } from './events/events';
import { Wallet } from './wallet/wallet';
import { Users } from './users/users';
import { Settings } from './settings/settings';
import { Analytics } from './analytics/analytics';
import { System } from './system/system';
import { Messaging } from './messaging/messaging';
import { Support } from './support/support';

export const routes: Routes = [
      {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'events',
    component: Events,
  },
  {
    path: 'wallet',
    component: Wallet,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'settings',
    component: Settings,
  },
  {
    path: 'analytics',
    component: Analytics,
  },
  {
    path: 'system',
    component: System,
  },
  {
    path: 'messaging',
    component: Messaging,
  },
  {
    path: 'support',
    component: Support,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
