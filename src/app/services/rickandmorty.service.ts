import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?page=${page}`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}
