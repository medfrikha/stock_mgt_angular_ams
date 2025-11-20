import { Routes } from '@angular/router';
import { ProviderList } from './components/provider-list/provider-list';
import { ProviderForm } from './components/provider-form/provider-form';
import { ArticleService } from './services/article';
import { ArticlesList } from './components/articles-list/articles-list';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './auth/auth-guard';
import { Register } from './auth/register/register';

export const routes: Routes = [

  { path: '', redirectTo: '/providers', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  { path: 'providers', component: ProviderList, canActivate: [AuthGuard] },
  { path: 'add-provider', component: ProviderForm, canActivate: [AuthGuard] }, // ✅ this line is required
  { path: 'articles', component: ArticlesList , canActivate: [AuthGuard]},

];
