import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL = 'https://api.first.org/data/v1/countries'

  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get(this.URL)
  }
}
