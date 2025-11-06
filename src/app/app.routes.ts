import { Routes } from '@angular/router';
import { ProviderList } from './components/provider-list/provider-list';
import { ProviderForm } from './components/provider-form/provider-form';
import { ArticleService } from './services/article';
import { ArticlesList } from './components/articles-list/articles-list';

export const routes: Routes = [

  { path: '', redirectTo: '/providers', pathMatch: 'full' },
  { path: 'providers', component: ProviderList },
  { path: 'add-provider', component: ProviderForm }, // ✅ this line is required
  { path: 'articles', component: ArticlesList },

];
