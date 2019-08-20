import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../Models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseURL = 'http://localhost:8080/member/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.baseURL + member.id, member);
  }
}
