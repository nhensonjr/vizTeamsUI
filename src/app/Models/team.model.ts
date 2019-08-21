import { Member } from './member.model';

export class Team {
  id: number;
  name: string;
  description: string;
  members: Member[];

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
    this.description = team.description;
    this.members = team.members;
  }
}
