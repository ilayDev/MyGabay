import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReadingBook} from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksForWeekService {
  path = 'calc/bookForWeek';

  constructor(private http: HttpClient) { }

  getBookForShabat(): Observable<ReadingBook[]>{
    return this.http.get<ReadingBook[]>(`${environment.api_url}${this.path}`);
  }
}
