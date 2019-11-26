import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getMemberHistory(memberId: number): Observable<any> {
    const memberHistory = '/history/' + memberId;

    return this.http.get(environment.backend.url + memberHistory);
  }

  getTeamHistory(teamId: number): Observable<any> {
    const teamHistory = '/history-team/' + teamId;
    return this.http.get(environment.backend.url + teamHistory);
  }
}
