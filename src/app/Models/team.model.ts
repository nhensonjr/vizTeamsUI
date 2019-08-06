import { Member } from './member.model';

export class Team {
  id: number;
  name: string;
  description: string;
  members: Member[];
}
