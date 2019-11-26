import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../../models/member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseURL = environment.backend.url + '/member/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.baseURL + member.id, member);
  }

  createMember(member: Member): Observable<any> {
    return this.http.post(this.baseURL, member);
  }

  deleteMember(member: Member): Observable<any> {
    return this.http.delete(this.baseURL + member.id, {responseType: 'text'});
  }
}
