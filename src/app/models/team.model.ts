import { Member } from './member.model';

export class Team {
  id: number;
  name: string;
  description: string;
  members: Member[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
