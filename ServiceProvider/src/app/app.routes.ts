import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Events } from './events/events';  // FIXED: Import Events component (not DOM Event)
import { Wallet } from './wallet/wallet';
import { Analytics } from './analytics/analytics';
import { Users } from './users/users';
import { Support } from './support/support';
import { Profileandbilling } from './profileandbilling/profileandbilling';

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
    path: 'analytics',
    component: Analytics,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'profile-billing', 
    component: Profileandbilling,
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