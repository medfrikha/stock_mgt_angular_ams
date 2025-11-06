import { Component } from '@angular/core';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider';
import { CommonModule } from '@angular/common';  // ✅ import this
import { ProviderForm } from '../provider-form/provider-form';


@Component({
  selector: 'app-provider-list',
  imports: [CommonModule, ProviderForm],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
  standalone: true

})
export class ProviderList {
  providers : Provider[]=[];
  selectedProvider : Provider | null = null;

  constructor(private providerService: ProviderService ) { }
  ngOnInit() {
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
    });
  }
  editProvider(provider: Provider) {
    this.selectedProvider = provider;
  }
  deleteProvider(providerId: number) {
    this.providerService.deleteProvider(providerId);
  }
  onProviderSaved(provider: Provider) {``
if (provider.id) {

  this.providerService.updateProvider(provider);
} else {
  this.providerService.addProvider(provider);
}
    this.selectedProvider = null;
  }

}
