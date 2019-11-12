export class TeamHistory {
  memberName: string;
  startedOnTeam: string;
  leftTeam: string;

  constructor(memberName: string, startedOnTeam: string, leftTeam: string) {
    this.memberName = memberName;
    this.startedOnTeam = startedOnTeam;
    this.leftTeam = leftTeam;
  }
}
