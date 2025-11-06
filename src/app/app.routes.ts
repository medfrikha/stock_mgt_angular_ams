import { Routes } from '@angular/router';
import { ProviderList } from './components/provider-list/provider-list';
import { ProviderForm } from './components/provider-form/provider-form';

export const routes: Routes = [

  { path: '', redirectTo: '/providers', pathMatch: 'full' },
  { path: 'providers', component: ProviderList },
];
