export class Member {
  team: number;
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  pathToPhoto: string;

  constructor(team: number, firstName: string, lastName: string, title: string, pathToPhoto: string) {
    this.team = team;
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.pathToPhoto = pathToPhoto;
  }
}
