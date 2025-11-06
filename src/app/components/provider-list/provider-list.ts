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
})
export class ProviderList {
  providers : Provider[]=[];
  selectedProvider : Provider | null = null;

  constructor(private providerService: ProviderService ) { }
  ngOnInit() {
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
    });
    this.providerService.watchProviders().subscribe(providers => {
      this.providers = providers;
    });
  }
  editProvider(provider: Provider) {
    this.selectedProvider = provider;
  }
  deleteProvider(providerId: number) {
    this.providerService.deleteProvider(providerId).subscribe({
      next: (deleteProvider) => {
        console.log('Provider deleted:', deleteProvider);
      },
      error: (err) => {
        console.error('Error deleting provider:', err);
      },
    });
  }
  onProviderSaved(provider: Provider) {
    console.log('Provider saved:', provider);

    if (provider.id) {
      // Update existing provider
      this.providerService.updateProvider(provider).subscribe({
        next: (updatedProvider) => {
          console.log('Provider updated:', updatedProvider);
        },
        error: (err) => {
          console.error('Error updating provider:', err);
        },
      });
    } else {
      // Add new provider
      const { id, ...providerData } = provider;

      this.providerService.addProvider(providerData as Provider).subscribe({
        next: (newProvider) => {
          console.log('Provider added:', newProvider);
        },
        error: (err) => {
          console.error('Error adding provider:', err);
        },
      });
    }

    this.selectedProvider = null;
  }

}
