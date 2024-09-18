import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RedditService } from './reddit.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule]
})
export class AppComponent {
  title = 'redditpost';
  posts: {
    title: string;
    safeSelftextHtml: SafeHtml;
    url: string;
    score: number;
  }[] = [];


  constructor(private redditService: RedditService, private sanitizer: DomSanitizer) {

    this.loadPosts();

  }




  loadPosts(): void {
    this.redditService.getRedditPosts().subscribe(data => {
      debugger
      this.posts = data.data.children.map((child: { data: { title: string; selftext_html: string | null; url: string; score: number; }; }) => {
        let sanitizedHtml: SafeHtml = '';

        // Check if selftext_html is not null before processing it
        if (child.data.selftext_html) {
          // Optionally unescape HTML entities if necessary
          const unescapedHtml = child.data.selftext_html.replace(/<[^>]*>/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;#39;/g, "'");
          sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(unescapedHtml);
        }

        return {
        
          title: child.data.title,
          safeSelftextHtml: sanitizedHtml, // Safe HTML or empty if no content
          url: child.data.url,
          score: child.data.score
        };
      });
      // console.log(this.posts[0])
    });
  }
}






