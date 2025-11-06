import { Component } from '@angular/core';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-list',
  imports: [CommonModule],
  templateUrl: './articles-list.html',
  styleUrl: './articles-list.css',
})
export class ArticlesList {
  articles : Article[]=[];
  selectedArticle : Article | null = null;

  constructor(private articleService: ArticleService ) { }
  ngOnInit() {
    this.articleService.getarticles().subscribe(articles => {
      this.articles = articles;
    });
    this.articleService.watcharticles().subscribe(articles => {
      this.articles = articles;
    });
  }
  editArticle(article: Article) {
    this.selectedArticle = article;
  }
  deleteArticle(articleId: number) {
    this.articleService.deleteArticle(articleId).subscribe({
      next: (deleteArticle) => {
        console.log('article deleted:', deleteArticle);
      },
      error: (err) => {
        console.error('Error deleting article:', err);
      },
    });
  }
  onArticleSaved(article: Article) {
    console.log('article saved:', article);

    if (article.id) {
      // Update existing article
      this.articleService.updateArticle(article).subscribe({
        next: (updatedArticle) => {
          console.log('article updated:', updatedArticle);
        },
        error: (err) => {
          console.error('Error updating article:', err);
        },
      });
    } else {
      // Add new article
      const { id, ...articleData } = article;

      this.articleService.addArticle(articleData as Article).subscribe({
        next: (newArticle) => {
          console.log('Article added:', newArticle);
        },
        error: (err) => {
          console.error('Error adding article:', err);
        },
      });
    }

    this.selectedArticle = null;

}
}