import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  // TODO: setup fancy environment variables

  // memberHistoryUrl = 'http://localhost:8080/history/';
  // teamHistoryUrl = 'http://localhost:8080/history-team/';
  memberHistoryUrl = 'https://viz-teams-back.herokuapp.com/history/';
  teamHistoryUrl = 'https://viz-teams-back.herokuapp.com/history-team/';

  constructor(private http: HttpClient) {
  }

  getMemberHistory(memberId: number): Observable<any> {
    return this.http.get(this.memberHistoryUrl + memberId);
  }

  getTeamHistory(teamId: number): Observable<any> {
    return this.http.get(this.teamHistoryUrl + teamId);
  }
}
