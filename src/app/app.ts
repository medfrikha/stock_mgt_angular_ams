import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProviderList } from "./components/provider-list/provider-list";
import { ProviderForm } from './components/provider-form/provider-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProviderList,ProviderForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
}
