import { Injectable } from '@angular/core';
import { Team } from '../Models/team.model';
import { Member } from '../Models/member.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(undefined);
  selectedMember: BehaviorSubject<Member> = new BehaviorSubject<Member>(undefined);

  constructor() {
  }
}
