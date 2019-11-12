import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(undefined);
  selectedMember: BehaviorSubject<Member> = new BehaviorSubject<Member>(undefined);

  constructor() {
  }
}
