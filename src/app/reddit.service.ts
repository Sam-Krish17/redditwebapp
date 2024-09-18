import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedditService {

  

  

  private apiUrl = 'https://redditapi-8e16.onrender.com/api/reddit';


  constructor(private http: HttpClient) { debugger}

  getRedditPosts(): Observable<any> {
    debugger
    return this.http.get<any>(this.apiUrl);
  } 
}
