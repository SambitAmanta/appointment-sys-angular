import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginPage } from './features/auth/login.page';
import { RegisterPage } from './features/auth/register.page';

export const routes: Routes = [
  { path: '', redirectTo: 'services', pathMatch: 'full' },

  // Public
  { path: 'auth/login', component: LoginPage },
  { path: 'auth/register', component: RegisterPage },

  // Dashboards
  { path: 'customer/dashboard', canActivate: [authGuard, roleGuard(['customer'])], loadComponent: () => import('./features/dashboard/customer-dashboard.page').then(m => m.CustomerDashboardPage) },
  { path: 'provider/dashboard', canActivate: [authGuard, roleGuard(['provider'])], loadComponent: () => import('./features/dashboard/provider-dashboard.page').then(m => m.ProviderDashboardPage) },
  { path: 'admin/dashboard',    canActivate: [authGuard, roleGuard(['admin'])],    loadComponent: () => import('./features/dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage) },

  // Stubs for now — real pages will come in later phases
  { path: 'services', loadComponent: () => import('./features/services/services-list.page').then(m => m.ServicesListPage) },

  // Fallbacks
  { path: 'unauthorized', loadComponent: () => import('./features/misc/unauthorized.page').then(m => m.UnauthorizedPage) },
  { path: '**', loadComponent: () => import('./features/misc/not-found.page').then(m => m.NotFoundPage) },
];
