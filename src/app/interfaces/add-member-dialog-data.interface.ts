import { Team } from '../models/team.model';

export interface AddMemberDialogData {
  team: Team;
  allTeams: Team[];
}
