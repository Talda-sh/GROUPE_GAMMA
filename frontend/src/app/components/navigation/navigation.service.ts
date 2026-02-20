import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) {}

  getRoute(destination: string) {
    return this.http.post(
      'http://127.0.0.1:8000/route',
      { destination: destination }
    );
  }

}
