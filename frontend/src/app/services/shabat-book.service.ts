import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToraBook } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShabatBookService {
  path = 'toraBooks/bookForShabat';

  constructor(private http: HttpClient) { }
  
  getBookForShabat():Observable<ToraBook>{
    return this.http.get<ToraBook>(`${environment.api_url}${this.path}`);
  }
}
