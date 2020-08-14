import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToraBook } from '../models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToraBookService {
  path = 'toraBooks'; 

  constructor(private http: HttpClient) { }

  getAllToraBooks(params: HttpParams = new HttpParams()): Observable<ToraBook[]>{
    return this.http.get<ToraBook[]>(environment.api_url + this.path, { params } );
  }



}
