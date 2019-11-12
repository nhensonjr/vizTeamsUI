import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // TODO: Make this more flexible
  baseUrl = 'https://picsum.photos/v2/list?page=2&limit=100';

  constructor(private http: HttpClient) {
  }

  getPhotos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
