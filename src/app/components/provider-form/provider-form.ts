import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Provider } from '../../models/provider.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-provider-form',
  imports: [FormsModule],
  templateUrl: './provider-form.html',
  styleUrl: './provider-form.css',
  standalone: true

})
export class ProviderForm {
  @Input() provider: Provider | null = null;
  @Output() save = new EventEmitter<Provider>();

  model: Provider = { id: 0, name: '', email: '', phone: '' , address:''};

  ngOnChanges() {
    this.model = this.provider ? { ...this.provider } : { id: 0, name: '', email: '', phone: '', address: '' };
  }

  onSubmit() {
    this.save.emit(this.model);
    this.model = { id: 0, name: '', email: '', phone: '' ,  address:''};
  }
}
