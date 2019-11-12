import { Team } from '../models/team.model';

export interface AddMemberDialogData {
  teamName: string;
  teams: Team[];
}
