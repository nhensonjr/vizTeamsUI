import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseURL = environment.backend.url + '/team/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post(this.baseURL, team);
  }

  updateTeam(team: Team): Observable<any> {
    return this.http.put(this.baseURL, team);
  }

  deleteTeam(team: Team): Observable<any> {
    return this.http.delete(this.baseURL + team.id, {responseType: 'text'});
  }
}
