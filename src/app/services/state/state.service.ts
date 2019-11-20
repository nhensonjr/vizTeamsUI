import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Team} from '../../models/team.model';
import {Member} from '../../models/member.model';
import {TeamService} from '../team/team.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  allTeams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>(undefined);
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(undefined);
  selectedMember: BehaviorSubject<Member> = new BehaviorSubject<Member>(undefined);

  constructor(private teamService: TeamService) {
  }

  updateState(): void {
    this.teamService.getAll().subscribe(teams => {
      this.allTeams.next(teams);
    });
  }
}
