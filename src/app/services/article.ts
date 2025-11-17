import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.apiUrl +'articles/';
  private articles: Article[] = [];
  private articlesSubject = new BehaviorSubject<Article[]>([]);

  constructor(private http: HttpClient) {}

  getarticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      tap((data) => {

        this.articles = data;
        this.articlesSubject.next(this.articles);
      })
    );
  }

  addArticle(article: Article): Observable<Article> {

    return this.http.post<Article>(this.apiUrl, article).pipe(
      tap((newArticle ) => {
        this.articles.push(newArticle );
        this.articlesSubject.next(this.articles);
      })
    );
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}${article.id}`, article).pipe(
      tap((updated) => {
        const index = this.articles.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          this.articles[index] = updated;
          this.articlesSubject.next(this.articles);
        }
      })
    );
  }

  deleteArticle(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${articleId}`).pipe(
      tap(() => {
        this.articles = this.articles.filter(p => p.id !== articleId);
        this.articlesSubject.next(this.articles);
      })
    );
  }

  watcharticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

}
