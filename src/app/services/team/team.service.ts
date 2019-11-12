import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseURL = 'http://localhost:8080/team/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post(this.baseURL, team);
  }
}
