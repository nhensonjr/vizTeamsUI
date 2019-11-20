import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../../models/team.model';
import {Member} from '../../models/member.model';
import {TeamService} from '../team/team.service';
import {AppState} from '../../models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  allTeams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>(undefined);
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(undefined);
  selectedMember: BehaviorSubject<Member> = new BehaviorSubject<Member>(undefined);

  constructor(private teamService: TeamService) {
  }
}
