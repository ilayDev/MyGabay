import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToraBook } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ShabatBookService {
  path = 'http://localhost:4000/api/toraBooks/bookForShabat';

  constructor(private http: HttpClient) { }
  // constructor() { }
  
  getBookForShabat():Observable<ToraBook>{
    return this.http.get<ToraBook>(this.path);
  }
}
