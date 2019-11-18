import { Member } from '../models/member.model';
import { Team } from '../models/team.model';


export interface EditDialogData {
  selectedMember: Member;
  selectedTeam: Team;
}
