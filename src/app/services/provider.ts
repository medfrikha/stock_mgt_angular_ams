import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Provider } from '../models/provider.model';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = 'http://localhost:8085/providers/'; // ✅ your Spring Boot backend URL
  private providers: Provider[] = [];
  private providersSubject = new BehaviorSubject<Provider[]>([]);

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl).pipe(
      tap((data) => {
        this.providers = data;
        this.providersSubject.next(this.providers);
      })
    );
  }

  addProvider(provider: Provider): Observable<Provider> {

    return this.http.post<Provider>(this.apiUrl, provider).pipe(
      tap((newProvider) => {
        this.providers.push(newProvider);
        this.providersSubject.next(this.providers);
      })
    );
  }

  updateProvider(provider: Provider): Observable<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}${provider.id}`, provider).pipe(
      tap((updated) => {
        const index = this.providers.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          this.providers[index] = updated;
          this.providersSubject.next(this.providers);
        }
      })
    );
  }

  deleteProvider(providerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${providerId}`).pipe(
      tap(() => {
        this.providers = this.providers.filter(p => p.id !== providerId);
        this.providersSubject.next(this.providers);
      })
    );
  }

  watchProviders(): Observable<Provider[]> {
    return this.providersSubject.asObservable();
  }
}